import { Link } from 'react-router';

function NavBar() {
  return (
    <nav className="flex justify-between px-50 py-10 items-center">
      <div className='flex items-center gap-3'>
        <Link to={'/'}><img src="../src/assets/geo-memory-map-nav-logo.png" alt="Geo Memory Map logo" className="w-13 h-10"/></Link>
        
        <h1 className="text-3xl font-display font-bold">Geo Memory Map</h1>
      </div>
      <ul className="flex gap-10 font-display">
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/about'}>About</Link>
        </li>
        <li>
          <Link to={'/login'}>Login</Link>
        </li>
        <li>
          <Link to={'/signup'}>Sign Up</Link>
        </li>
        <li>
          <Link to={'/contact'}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
