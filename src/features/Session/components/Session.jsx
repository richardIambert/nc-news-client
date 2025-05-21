import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getInitials } from '../../../services/formatting';
import { SignOutButton, UnauthenticatedLinks, useAuth } from '../../Auth';
import { Avatar } from './Avatar';

export const Session = () => {
  const {
    state: { session, user, isLoading, error },
  } = useAuth();
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
    <div>
      <button onClick={toggleIsOpen}>
        <Avatar initials={initials} />
      </button>
      <nav>
        <header>
          <Avatar initials={initials} />
          <h3>
            {first_name} {last_name}
          </h3>
        </header>
        <ol>
          <li>
            <Link to="/me">My Profile</Link>
          </li>
          <SignOutButton />
        </ol>
      </nav>
    </div>
  ) : (
    <UnauthenticatedLinks />
  );
};
