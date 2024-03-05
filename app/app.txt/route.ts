export const runtime = 'edge';

export async function GET() {
  const adsTxt = await fetch(
    new URL('../../public/ads.txt', import.meta.url),
  ).then((res) => res.text());
  return new Response(adsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
