import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { validateUser } from '@/lib/auth/validadeUser';
import { logError } from '@/lib/logger';

export async function POST(req: NextRequest) {
  const user = await validateUser(req);

  if (!user) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { email, oldPassword, newPassword } = body;

    if (!email || !newPassword || !oldPassword) {
      return NextResponse.json(
        { error: 'Campos obrigatórios' },
        { status: 400 }
      );
    }

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.signInWithPassword({
        email,
        password: oldPassword,
      });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: 'Senha antiga inválida' },
        { status: 401 }
      );
    }

    const userId = authData.user.id;

    const { data, error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: newPassword,
      });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Senha atualizada com sucesso', data },
      { status: 200 }
    );
  } catch (err) {
    logError(err);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}
