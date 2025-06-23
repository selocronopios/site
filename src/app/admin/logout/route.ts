// src/app/admin/logout/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');

  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL));
}
