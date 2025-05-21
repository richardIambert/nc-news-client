import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AuthenticatedRoute = ({ children, redirectPath = '/signin' }) => {
  const {
    state: { session, isLoading, error },
  } = useAuth();

  // TODO: Extract Loading component
  if (isLoading) return <p>Loading</p>;

  if (!session || error) {
    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }

  return children ? children : <Outlet />;
};
