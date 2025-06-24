import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    navigate("/auth");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-purple-600 text-white">
      <h1 className="text-xl font-bold">Milestone Tracker</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate("/milestone/new")} className="hover:underline">Create Milestone</button>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth" className="hover:underline">Login</Link>
            {/* <Link to="/auth" className="hover:underline">Signup</Link> */}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
