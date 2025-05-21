import { Link } from 'react-router-dom';
import { SignUpForm } from '../components/SignUpForm';

export const SignUpPage = () => {
  return (
    <>
      <SignUpForm />
      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </>
  );
};
