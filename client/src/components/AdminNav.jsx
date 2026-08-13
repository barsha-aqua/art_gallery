import { NavLink, useNavigate } from "react-router-dom";

export default function AdminNav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  const linkClass = ({ isActive }) =>
    `text-sm px-3 py-1.5 rounded transition-colors ${
      isActive
        ? "bg-orange-800 text-white"
        : "text-stone-600 hover:bg-stone-200"
    }`;

  return (
    <div className="bg-white border-b border-stone-200 px-10 py-3 flex items-center gap-3">
      <NavLink to="/admin/dashboard" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/admin/manage" className={linkClass}>
        Manage
      </NavLink>
      <button
        onClick={handleLogout}
        className="text-sm px-3 py-1.5 rounded text-red-500 hover:bg-red-50 transition-colors ml-auto"
      >
        Logout
      </button>
    </div>
  );
}
