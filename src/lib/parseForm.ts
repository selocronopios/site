import formidable from 'formidable'
import type { NextRequest } from 'next/server'
import { Readable } from 'stream'

export async function parseForm(req: NextRequest): Promise<{ fields: Record<string, any>, files: Record<string, any> }> {
  const headers: Record<string, string> = {}
  req.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value
  })

  const form = formidable({
    keepExtensions: true,
    multiples: false,
  })

  const stream = Readable.fromWeb(req.body as any)

  // hack: inject headers manual (porque o parse espera headers no stream)
  ;(stream as any).headers = headers

  return await new Promise((resolve, reject) => {
    form.parse(stream as any, (err: any, fields: any, files: any) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}
