import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AuthenticatedRoute, SignInPage, SignUpPage } from './features/Auth';
import { ArticleContextProvider, ArticlePage, ArticlesPage } from './features/Article';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/articles" /> },
  {
    path: '/articles',
    element: (
      <AuthenticatedRoute>
        <ArticleContextProvider>
          <Outlet />
        </ArticleContextProvider>
      </AuthenticatedRoute>
    ),
    children: [
      { index: true, element: <ArticlesPage /> },
      { path: ':article_id', element: <ArticlePage /> },
    ],
  },
  { path: '/signin', element: <SignInPage /> },
  { path: '/signup', element: <SignUpPage /> },
]);
