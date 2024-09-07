// lib/fetchCoords.ts

export async function fetchCoords() {
  const coordsResponse = await fetch(
    "https://ytree.vercel.app/api/Tree/All_coords",
    {
      cache: "no-store",
    }
  );
  const coordsData = await coordsResponse.json();

  const usersResponse = await fetch(
    "https://ytree.vercel.app/api/Tree/All_users",
    {
      cache: "no-store",
    }
  );
  const usersData = await usersResponse.json();

  return { coordsData, usersData };
}
