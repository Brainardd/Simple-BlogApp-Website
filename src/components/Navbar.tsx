import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-colors">
          BlogApp
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-500 transition-colors font-medium"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-600 font-medium">
                Hello, {user.email.split('@')[0]}
                </span>
                    <Link
                        to="/logout"
                        className="text-red-500 hover:text-red-600 transition-colors font-medium"
                >
                Logout
                </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
