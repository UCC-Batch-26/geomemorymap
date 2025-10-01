const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function updateMemory(id, memoryData, token) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: memoryData.title,
      description: memoryData.description,
      location: memoryData.location,
      photoURL: memoryData.photoURL,
    }),
  });

  if (!response.ok) throw new Error("Failed to update memory");
  return response.json();
}