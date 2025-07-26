// src/App.tsx

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ProtectedRoute from './components/ProtectedRoute';
import GddDetailPage from './pages/GddDetailPage'; // Garanta que esta linha está correta

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/gdd/:id', // Garanta que esta rota está correta
    element: (
      <ProtectedRoute>
        <GddDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/termos',
    element: <TermsOfUsePage />,
  },
  {
    path: '/privacidade',
    element: <PrivacyPolicyPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
