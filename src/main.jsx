import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthContextProvider } from './features/Auth';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
