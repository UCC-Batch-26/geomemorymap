import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-lg">Page not found.</p>
      <p className="mt-2 text-sm text-gray-600">The page you are looking for does not exist.</p>

      <Link to="/" className="mt-6 rounded-lg bg-[#526b5c] px-5 py-3 text-white transition hover:opacity-90">
        Go back home
      </Link>
    </section>
  );
}

export default NotFoundPage;
