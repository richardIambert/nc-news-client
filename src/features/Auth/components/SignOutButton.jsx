import { useAuth } from '../contexts/AuthenticationContext';

export const SignOutButton = () => {
  const { signout } = useAuth();

  return <button onClick={signout}>Sign Out</button>;
};
