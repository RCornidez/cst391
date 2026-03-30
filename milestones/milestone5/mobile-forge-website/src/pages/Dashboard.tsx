import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/Auth';
import { useSnackbar } from '../services/Snackbar';
import ROUTES from '../routes';
import './Dashboard.css';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const activeFragment = location.hash.replace('#', '') || 'getting_started';

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  function handleLogout() {
    logout()
      .then(() => navigate(ROUTES.LOGIN))
      .catch(() => navigate(ROUTES.LOGIN));
  }

  function navItemClass(fragment: string) {
    return `nav-item${activeFragment === fragment ? ' nav-item-active' : ''}`;
  }

  return (
    <div className="dashboard">
      <div className="mobile-topbar">
        <span className="brand">mobile_forge</span>
        <button className="nav-toggle" onClick={() => setSidebarOpen(o => !o)}>
          <i className={sidebarOpen ? 'ph ph-x' : 'ph ph-list'}></i>
        </button>
      </div>

      <div className={`sidebar-backdrop${sidebarOpen ? ' visible' : ''}`} onClick={() => setSidebarOpen(false)} />

      <aside className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <span className="brand">mobile_forge</span>
        <nav className="sidebar-nav">
          <span className="nav-section-label">resources</span>
          <a href={`${ROUTES.RESOURCES}#getting_started`} className={navItemClass('getting_started')}>
            <i className="ph ph-rocket-launch"></i>
            getting_started
          </a>
          <a href={`${ROUTES.RESOURCES}#how_to_guides`} className={navItemClass('how_to_guides')}>
            <i className="ph ph-book-open"></i>
            how_to_guides
          </a>
          <NavLink to={ROUTES.FEATURES} className={({ isActive }) => `nav-item${isActive ? ' nav-item-active' : ''}`}>
            <i className="ph ph-lightbulb"></i>
            feature_voting
          </NavLink>

          <span className="nav-section-label">settings</span>
          <a href={`${ROUTES.SETTINGS}#keys`} className={navItemClass('keys')}>
            <i className="ph ph-key"></i>
            keys
          </a>
          <a href={`${ROUTES.SETTINGS}#account`} className={navItemClass('account')}>
            <i className="ph ph-user-circle"></i>
            account
          </a>
          <a href={`${ROUTES.SETTINGS}#billing`} className={navItemClass('billing')}>
            <i className="ph ph-credit-card"></i>
            billing
          </a>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="ph ph-sign-out"></i>
          logout
        </button>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
