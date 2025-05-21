import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignOutButton, UnauthenticatedLinks, useAuth } from '../../Auth';
import { Avatar } from './Avatar';
import { getInitials } from '../../../services/formatting/formatName';

export const Session = () => {
  const { session, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // TODO: Create useClickOutside hook to close dropdown

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

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
