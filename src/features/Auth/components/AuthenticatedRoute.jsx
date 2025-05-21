import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AuthenticatedRoute = ({ children, redirectPath = '/signin' }) => {
  const { session } = useAuth();

  if (!session) {
    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }

  return children ? children : <Outlet />;
};
