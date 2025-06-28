import { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthContext';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">
          <Link to="/" onClick={closeMenu}>MyBlog</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu */}
        <div className={`md:flex space-x-4 text-sm md:text-base items-center ${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-16 left-0 w-full md:w-auto bg-gradient-to-b md:bg-none from-gray-800 to-gray-700 md:from-transparent p-4 md:p-0 z-40 transition duration-300`}>
          <Link
            to="/"
            onClick={closeMenu}
            className="block md:inline hover:text-blue-400 transition duration-200 py-1"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/create"
                onClick={closeMenu}
                className="block md:inline hover:text-blue-400 transition duration-200 py-1"
              >
                Create
              </Link>

              {user && (
                <span className="block md:inline ml-0 md:ml-4 font-semibold text-green-300 py-1">
                  {capitalize(user.username)}
                </span>
              )}

              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="mt-2 md:mt-0 ml-0 md:ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow transition duration-300 text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block md:inline text-green-300 hover:text-green-200 transition duration-200 py-1"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block md:inline ml-0 md:ml-2 text-green-300 hover:text-green-200 transition duration-200 py-1"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
