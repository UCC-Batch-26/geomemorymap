const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMemories(token) {
  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch memories');
  return response.json(); // array of memories
}
