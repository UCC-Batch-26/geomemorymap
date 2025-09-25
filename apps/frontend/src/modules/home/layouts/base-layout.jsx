import NavBar from '@/modules/common/components/navbar';
import { Outlet } from 'react-router';

export default function BaseLayout() {
  return (
    <div className="bg-[#f6f6f6]  h-screen">
      <NavBar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
