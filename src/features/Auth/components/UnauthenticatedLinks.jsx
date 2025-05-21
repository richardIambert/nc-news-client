import { Link } from 'react-router-dom';

export const UnauthenticatedLinks = () => {
  return (
    <div>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Create Account</Link>
    </div>
  );
};
