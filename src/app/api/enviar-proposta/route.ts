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

    const fromEmail =
      'Cronópios Selo Editorial <contato@publicacoes.historiaintelectualufmg.com.br>';

    const options = {
      from: fromEmail,
      to: ['infoselocronopios@gmail.com', email],
      subject: `Confirmação de recebimento: ${title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 10px;">Nova Proposta de Publicação</h2>
          <p style="font-size: 16px;">Olá, <strong>${autores}</strong>.</p>
          <p>Recebemos os detalhes da sua submissão para <em>Cronópios Selo Editorial</em>.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Título:</strong> ${title}</p>
            <p style="margin: 5px 0;"><strong>Afiliação:</strong> ${afiliacao}</p>
            <p style="margin: 5px 0;"><strong>Telefone:</strong> ${telefone}</p>
            <p style="margin: 5px 0;"><strong>E-mail:</strong> ${email}</p>
          </div>
          
          <p style="font-size: 14px; color: #7f8c8d;">O arquivo anexado foi enviado com sucesso para a equipe editorial.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #bdc3c7; text-align: center;">Cronópios Selo Editorial - UFMG</p>
        </div>
      `,
      text: `Nova proposta recebida: ${title}. Autores: ${autores}.`,
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
