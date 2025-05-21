import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthenticatedRoute, SignInPage, SignUpPage } from './features/Auth';
import { FeedPage } from './features/Feed';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/feed" /> },
  {
    path: '/feed',
    element: (
      <AuthenticatedRoute>
        <FeedPage />
      </AuthenticatedRoute>
    ),
  },
  { path: '/signin', element: <SignInPage /> },
  { path: '/signup', element: <SignUpPage /> },
]);
