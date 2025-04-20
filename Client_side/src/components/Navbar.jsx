
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    let navigate=useNavigate();
  
    const handleLogout = () => {
      sessionStorage.removeItem('user');
     navigate('/login');
    };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          BlogWeb
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          {storedUser && (
            <Link to="/Addblog" className="hover:text-gray-400">
              Create Post
            </Link>
          )}
          {/* {storedUser?.role === "admin" && (
            <Link to="/admin/posts" className="hover:text-gray-400">
              Admin Panel
            </Link>
          )} */}
          {!storedUser ? (
            <>
              <Link to="/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-400">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
