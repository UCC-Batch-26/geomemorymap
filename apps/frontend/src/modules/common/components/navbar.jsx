import { Link } from 'react-router';
import logo from '@/assets/geo-memory-map-nav-logo.png';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function NavBar() {
  const navLink =
  "relative transition transform hover:-translate-y-1 duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#526B5C] after:transition-all after:duration-300 hover:after:w-full";
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isGuest = sessionStorage.getItem('guest') === 'true';

    if (token || isGuest) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    sessionStorage.removeItem('guest');
    sessionStorage.removeItem('guestMemories');

    toast.success('Logged out succesfully');

    navigate('/login');
  };

  return (
    <nav className="bg-[#f2f0ef] flex justify-between px-50 py-10 place-items-center items-center w-full">
      <div className=" flex items-center gap-3">
        <Link to={'/'}>
          <img src={logo} alt="Geo Memory Map logo" className="w-13 h-10" />
        </Link>

        <h1 className="text-3xl font-display font-bold text-[#526B5C]">Geo Memory Map</h1>
      </div>

      <ul className="flex gap-10 font-display items-center">
        <li>
          <Link to={'/'} className={navLink}>Home</Link>
        </li>
        <li>
          <Link to={'/about'} className={navLink}>About</Link>
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
          <Link to={'/contact'} className={navLink}>Contact</Link>
        </li>

        {isAuthenticated && (
          <li>
            <button
              onClick={handleLogout}
              className="bg-[#EF6B48] text-white px-4 py-2 rounded-md hover:bg-[#e9542b] hover:-translate-y-0.5 transition duration-200"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
