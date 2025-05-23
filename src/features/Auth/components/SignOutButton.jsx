import { useAuth } from '../contexts/AuthenticationContext';

export const SignOutButton = ({ className }) => {
  const { signout } = useAuth();

  return (
    <button
      onClick={signout}
      className={`w-full p-4 block hover:bg-neutral-100 transition-colors cursor-pointer text-left ${className}`}
    >
      Sign Out
    </button>
  );
};
