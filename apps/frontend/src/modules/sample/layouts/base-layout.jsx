import NavBar from '@/modules/common/components/navbar';
import { Outlet } from 'react-router';

export default function BaseLayout() {
  return (
    <div>
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}