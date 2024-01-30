import { Link } from "react-router-dom";
import { useUserDispatch } from "./UserContext.jsx";

const Navbar = ({ user }) => {
  const userDispatch = useUserDispatch();

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    localStorage.removeItem("loggedBlogAppUser");
  };

  return (
    <nav className="navbar bg-base-100">
      <div className="mx-auto flex max-w-6xl gap-4">
        <div>
          <Link to="/" className="btn btn-ghost text-xl">
            Blog App
          </Link>
        </div>
        <ul className="menu menu-horizontal rounded-box bg-base-200">
          <li>
            <Link to="/">Blog</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
        {user && (
          <>
            <span className="font-semibold">{user?.name} </span>
            <button className="link link-error" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
