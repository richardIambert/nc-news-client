import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthenticationContext';

export const AuthenticatedRoute = ({ children, redirectPath = '/signin' }) => {
  const { user, isLoading } = useAuth();

  // TODO: Extract loading component
  if (isLoading) return <p>Loading...</p>;

  if (!user) {
    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }

  return children ? children : <Outlet />;
};
