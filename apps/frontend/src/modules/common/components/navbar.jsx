import { Link } from 'react-router';
import logo from '@/assets/geo-memory-map-nav-logo.png';

function NavBar() {
  return (
    <nav className="bg-[#f2f0ef] flex justify-between px-50 py-10 place-items-center items-center w-full">
      <div className=" flex items-center gap-3">
        <Link to={'/'}>
          <img src={logo} alt="Geo Memory Map logo" className="w-13 h-10" />
        </Link>

        <h1 className="text-3xl font-display font-bold text-[#526B5C]">Geo Memory Map</h1>
      </div>

      <ul className="flex gap-10 font-display">
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/about'}>About</Link>
        </li>
        {/* <li>
          <Link to={'/login'}>Login</Link>
        </li>
        <li>
          <Link to={'/signup'}>Sign Up</Link>
        </li>
        <li>
          <Link to={'/user'}>Profile</Link>
        </li> */}
        <li>
          <Link to={'/contact'}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
