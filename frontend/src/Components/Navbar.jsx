import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthContext';
import { Link } from 'react-router-dom';

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">
          <Link to="/">MyBlog</Link>
        </div>

        {/* Nav links */}
        <div className="space-x-4 text-sm md:text-base flex items-center">
          <Link to="/" className="hover:text-blue-400 transition duration-200">
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/create"
                className="hover:text-blue-400 transition duration-200"
              >
                Create
              </Link>

              {/* Show User name */}
              {user && (
                <span className="ml-4 font-semibold text-green-300">
                  {capitalize(user.username)}
                </span>
              )}

              <button
                onClick={logout}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 font-semibold text-sm shadow"
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="text-green-300 hover:text-green-200 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="ml-2 text-green-300 hover:text-green-200 transition duration-200"
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
