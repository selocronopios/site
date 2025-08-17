import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('ebooks')
      .select('keywords')
      .order('keywords', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const uniqueKeywords = Array.from(
      new Set(data.flatMap((item) => item.keywords ?? []))
    );

    return NextResponse.json(uniqueKeywords, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
