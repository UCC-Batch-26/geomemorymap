import NavBar from '@/modules/common/components/navbar';
import { Outlet } from 'react-router';

export default function BaseLayout() {
  return (
    <div className="bg-[#F2F0EF]">
      <NavBar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
