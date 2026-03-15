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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  

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

    setIsAuthenticated(false);
    setIsMenuOpen(false);

    toast.success('Logged out succesfully');

    navigate('/login');
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };


  return (
    <nav className="bg-[#f2f0ef] w-full">
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-12'>
        <div className="flex items-center gap-3">
          <Link to="/" onClick={handleCloseMenu}>
            <img src={logo} alt="Geo Memory Map logo" className="w-13 h-10" />
          </Link>

          <h1 className="font-display text-lg font-bold text-[#526B5C] sm:text-2xl md:text-3xl">Geo Memory Map</h1>
        </div>

      <ul className="hidden items-center gap-8 md:flex font-display ">
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

        <button
          type='button'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='flex flex-col gap-1.5 md:hidden'
          aria-label='Toggle navigation menu'
        >
          <span className="h-0.5 w-6 bg-[#526B5C]"></span>
          <span className="h-0.5 w-6 bg-[#526B5C]"></span>
          <span className="h-0.5 w-6 bg-[#526B5C]"></span>
          
        </button>
      </div>

      {isMenuOpen && (
        <div className='border-t border-[#526B5C]/10 bg-[#f2f0ef] px-4 pb-4 md:hidden'>
          <ul className='flex flex-col gap-4 pt-4 font-display'>
            <li>
              <Link to='/' onClick={handleCloseMenu} className='block text-[#526B5C]'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about' onClick={handleCloseMenu} className='block text-[#526B5C]'>
                About
              </Link>
            </li>
            <li>
              <Link to='/contact' onClick={handleCloseMenu} className='block text-[#526B5C]'>
                Contact
              </Link>
            </li>

            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout}
                  className='w-full rounded-md bg-[#EF6B48] px-4 py-2 text-white transition hover:bg-[#e9542b]'
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

        </div>
      )}
    </nav>
  );
}

export default NavBar;
