import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json().catch(() => null)
  const secret =
    body?.secret || request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const slug = body?.slug as string | undefined

  try {
    // Cache tag'lerini temizle (Notion API cache)
    revalidateTag('posts', 'max')

    // Sayfa cache'lerini temizle
    revalidatePath('/')
    revalidatePath('/haber')
    revalidatePath('/analiz')
    revalidatePath('/rehber')

    if (slug) {
      revalidatePath(`/${slug}`)
    }

    return NextResponse.json({
      revalidated: true,
      paths: ['/', '/haber', '/analiz', '/rehber', ...(slug ? [`/${slug}`] : [])],
      timestamp: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
