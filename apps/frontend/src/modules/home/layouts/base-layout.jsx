import NavBar from '@/modules/common/components/navbar';
import { Outlet } from 'react-router';

export default function BaseLayout() {
  return (
    <div className="">
      <NavBar />
      <main className="bg-[#f2f0ef]">
        <Outlet />
      </main>
    </div>
  );
}
