// app/api/enviar-proposta/route.ts
import { NextResponse } from 'next/server';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

// Configuração do Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const autores = form.get('autores') as string;
    const afiliacao = form.get('afiliacao') as string;
    const title = form.get('title') as string;
    const email = form.get('email') as string;
    const telefone = form.get('telefone') as string;
    const file = form.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Arquivo não enviado.' },
        { status: 400 }
      );
    }

    // Converte o arquivo em Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Monta os dados do e-mail
    const options = {
      from: 'Envio de proposta <infoselocronopios@gmail.com>',
      to: 'infoselocronopios@gmail.com',
      subject: `Nova proposta: ${title}`,
      text: `Nova proposta de publicação recebida:
Autores: ${autores}
Afiliação: ${afiliacao}
Título: ${title}
Email: ${email}
Telefone: ${telefone}`,
      attachment: [
        {
          data: buffer,
          filename: file.name,
        },
      ],
    };

    // Envio do e-mail
    const response = await mg.messages.create(
      process.env.MAILGUN_DOMAIN!,
      options
    );

    return NextResponse.json({ success: true, response });
  } catch (err) {
    return NextResponse.json(
      { error: `Falha ao enviar proposta.: ${err}` },
      { status: 500 }
    );
  }
}
