const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createMemory(memoryData, token) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: memoryData.title,
      description: memoryData.description,
      location: memoryData.location, // { lat, lng }
      photoURL: memoryData.photoURL, // string URL of uploaded image
    }),
  });

  if (!response.ok) throw new Error("Failed to create memory");
  return response.json();
}