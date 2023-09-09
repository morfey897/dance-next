import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return new Response(
    JSON.stringify({ test: 'DATA_TEST' }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}