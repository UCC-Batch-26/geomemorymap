const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function deleteMemory(id, token) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to delete memory');
}
