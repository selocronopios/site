//src/app/api/enviar-proposta/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY!,
});

export async function POST(req: NextRequest) {
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
        { success: false, error: 'Arquivo ausente' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const data = new formData();
    data.append('from', 'Envio de proposta <infoselocronopios@gmail.com>');
    data.append('to', 'infoselocronopios@gmail.com');
    data.append('subject', `Nova proposta: ${title}`);
    data.append(
      'text',
      `Nova proposta de publicação recebida:
        Autores: ${autores}
        Afiliação: ${afiliacao}
        Título: ${title}
        Email: ${email}
        Telefone: ${telefone}`
    );
    data.append('attachment', buffer, file.name);

    const response = await mg.messages.create(
      process.env.MAILGUN_DOMAIN!,
      data as any
    );
    console.log('Email enviado:', response);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar proposta:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
