const CONTACT_URL = `${import.meta.env.VITE_BACKEND_URL}/api/contact`;

export async function sendContactMessage({ name, email, message }) {
  const response = await fetch(CONTACT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message
    })
  })

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to send message.');
  }

  return data;
}