// app/api/music/route.ts

export async function GET() {
  const response = await fetch(
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  );

  if (!response.ok) {
    return new Response("Failed to fetch MP3", { status: 500 });
  }

  const arrayBuffer = await response.arrayBuffer();

  return new Response(arrayBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400", // Optional caching
    },
  });
}
