import { NextResponse } from 'next/server';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const b2 = new S3Client({
  region: process.env.B2_REGION!,
  endpoint: process.env.B2_ENDPOINT!,
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
  credentials: {
    accessKeyId: process.env.B2_KEY_ID!,
    secretAccessKey: process.env.B2_APP_KEY!,
  },
});

const TAMANHO_MAXIMO_BYTES = 100 * 1024 * 1024; // 100 MB
const EXTENSOES_PERMITIDAS = ['.doc', '.docx'];
const MIME_TYPES_WORD = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function isJanelaSubmissaoAberta(dataReferencia = new Date()): boolean {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(dataReferencia);

  const ano = Number(partes.find((p) => p.type === 'year')?.value);
  const mes = Number(partes.find((p) => p.type === 'month')?.value);

  if (ano === 2027) {
    return mes === 8 || mes === 9;
  }

  return ano > 2027 && [3, 4, 8, 9].includes(mes);
}

export async function POST(request: Request) {
  try {
    if (!isJanelaSubmissaoAberta()) {
      return NextResponse.json(
        {
          error:
            'O recebimento de propostas ocorre apenas em março, abril, agosto e setembro, a partir de agosto de 2027.',
        },
        { status: 403 }
      );
    }

    const { fileName, fileType, fileSize } = await request.json();

    if (!fileName || !fileSize) {
      return NextResponse.json(
        { error: 'Dados do arquivo incompletos.' },
        { status: 400 }
      );
    }

    if (fileSize > TAMANHO_MAXIMO_BYTES) {
      return NextResponse.json(
        { error: 'O arquivo excede o limite máximo de 100 MB.' },
        { status: 400 }
      );
    }

    const indicePonto = fileName.lastIndexOf('.');
    const extensao =
      indicePonto !== -1 ? fileName.slice(indicePonto).toLowerCase() : '';

    if (!EXTENSOES_PERMITIDAS.includes(extensao)) {
      return NextResponse.json(
        {
          error:
            'Formato inválido. Envie apenas arquivos Word (.doc ou .docx).',
        },
        { status: 400 }
      );
    }

    const tipoPermitido =
      !fileType ||
      fileType === 'application/octet-stream' ||
      MIME_TYPES_WORD.includes(fileType);
    if (!tipoPermitido) {
      return NextResponse.json(
        {
          error:
            'Tipo de arquivo inválido. Envie um documento Word (.doc ou .docx).',
        },
        { status: 400 }
      );
    }

    const nomeLimpo = fileName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '_');

    const chaveObjeto = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${nomeLimpo}`;

    const contentType =
      fileType && MIME_TYPES_WORD.includes(fileType)
        ? fileType
        : extensao === '.doc'
          ? 'application/msword'
          : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    const uploadUrl = await getSignedUrl(
      b2,
      new PutObjectCommand({
        Bucket: process.env.B2_BUCKET_NAME,
        Key: chaveObjeto,
        ContentType: contentType,
      }),
      { expiresIn: 900 } // 15 min para subir
    );

    const downloadUrl = await getSignedUrl(
      b2,
      new GetObjectCommand({
        Bucket: process.env.B2_BUCKET_NAME,
        Key: chaveObjeto,
      }),
      { expiresIn: 604800 } // 7 dias para a equipe baixar pelo e-mail
    );

    return NextResponse.json({ uploadUrl, downloadUrl, contentType });
  } catch {
    return NextResponse.json(
      { error: 'Falha ao preparar o envio do arquivo.' },
      { status: 500 }
    );
  }
}
