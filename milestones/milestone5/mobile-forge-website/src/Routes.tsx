import { createBrowserRouter, Navigate } from 'react-router-dom';
import ROUTES from './routes';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Features from './pages/Features';
import Settings from './pages/Settings';

const router = createBrowserRouter([
  { path: ROUTES.ROOT, element: <Landing/> },
  { path: ROUTES.LOGIN, element: <Login/> },
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard/>,
    children: [
      { path: 'resources', element: <Resources/> },
      { path: 'features',  element: <Features/> },
      { path: 'settings',  element: <Settings/> },
    ],
  },
  { path: ROUTES.ALL, element: <Navigate to={ROUTES.ROOT} replace /> },
]);

export default router;