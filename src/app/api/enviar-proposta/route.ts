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
const EXTENSOES_PERMITIDAS = ['.pdf', '.doc', '.docx', '.zip'];

export async function POST(request: Request) {
  try {
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

    const extensao = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
    if (!EXTENSOES_PERMITIDAS.includes(extensao)) {
      return NextResponse.json(
        { error: 'Formato inválido. Envie PDF, DOC, DOCX ou ZIP.' },
        { status: 400 }
      );
    }

    const nomeLimpo = fileName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '_');

    const chaveObjeto = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${nomeLimpo}`;
    const contentType = fileType || 'application/octet-stream';

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
  } catch (err) {
    const detalhe = err instanceof Error ? err.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: 'Falha ao preparar o envio do arquivo.' },
      { status: 500 }
    );
  }
}
