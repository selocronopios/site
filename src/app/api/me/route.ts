import { NextRequest, NextResponse } from 'next/server';
import { validateUser } from '@/lib/auth/validadeUser';

export async function GET(req: NextRequest) {
  const user = await validateUser(req);

  // 🔐 Se tiver token no header (Insomnia, mobile, etc.)
  if (!user) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  return NextResponse.json(user);
}
