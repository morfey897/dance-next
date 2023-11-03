import type { NextRequest } from 'next/server';
import { events } from '@/lib/google.server';

export async function GET(request: NextRequest) {

  const start = (request.nextUrl.searchParams?.get('start') || '').split("T")[0];
  const end = (request.nextUrl.searchParams?.get('end') || '').split("T")[0];

  const response = await events({ start, end });
  const success = !!response;
  return new Response(JSON.stringify({
    success,
    ...(success ? { events: response } : { error: 'Not found' }),
    start,
    end
  }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
}