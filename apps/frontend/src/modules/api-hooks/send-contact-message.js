const CONTACT_URL = `${import.meta.env.VITE_BACKEND_URL}/api/contact`;
const FORMSPREE_URL = 'https://formspree.io/f/xvzwewgn';

export async function sendContactMessage({ name, email, message }) {
  const response = await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to send message.');
  }

  return data;
}
