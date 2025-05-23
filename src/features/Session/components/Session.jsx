import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getInitials } from '../../../services/formatting';
import { SignOutButton, UnauthenticatedLinks, useAuth } from '../../Auth';
import { Avatar } from './Avatar';

export const Session = () => {
  const { session, user, isLoading, error } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // TODO: Create useClickOutside hook to close dropdown

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  // TODO: Extract Loading component
  if (isLoading) return <p>Loading...</p>;

  const { first_name, last_name } = user;
  const initials = getInitials(`${first_name} ${last_name}`);

  return session ? (
    <div className="relative">
      <button
        onClick={toggleIsOpen}
        className="rounded-full cursor-pointer outline-2 outline-dashed outline-offset-2 outline-transparent focus:outline-red-500 transition-colors"
      >
        <Avatar initials={initials} />
      </button>
      <nav
        className={`w-64 z-10 absolute mt-2 right-0 bg-white rounded-lg shadow-lg overflow-hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <header className="p-4 flex flex-col gap-2 items-center border-b border-neutral-200">
          <Avatar initials={initials} />
          <h3>
            {first_name} {last_name}
          </h3>
        </header>
        <ol className="divide-y divide-neutral-200">
          <li>
            <Link
              to="/me"
              className="w-full p-4 block hover:bg-neutral-100 transition-colors cursor-pointer text-left"
            >
              My Profile
            </Link>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ol>
      </nav>
    </div>
  ) : (
    <UnauthenticatedLinks />
  );
};
