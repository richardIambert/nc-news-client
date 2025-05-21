import { Link } from 'react-router-dom';
import { SignInForm } from '../components/SignInForm';

export const SignInPage = () => {
  return (
    <>
      <SignInForm />
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </>
  );
};
