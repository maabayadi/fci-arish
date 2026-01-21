import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>

      <nav className="sidebar-menu">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/students">Students</NavLink>
        <NavLink to="/admin/professors">Professors</NavLink>
        <NavLink to="/admin/departments">Departments</NavLink>
        <NavLink to="/admin/courses">Courses</NavLink>
        <NavLink to="/admin/news">News</NavLink>
        <NavLink to="/admin/ads">Ads/Banners</NavLink>
        <NavLink to="/admin/schedules">Schedules</NavLink>
        <NavLink to="/admin/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

