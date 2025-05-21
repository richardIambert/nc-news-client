import { useAuth } from '../contexts/AuthContext';

export const SignOutButton = () => {
  const { signout } = useAuth();

  return <button onClick={signout}>Sign Out</button>;
};
