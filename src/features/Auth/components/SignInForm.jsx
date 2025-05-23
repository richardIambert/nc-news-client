import { useState } from 'react';
import { useAuth } from '../contexts/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../../components';

export const SignInForm = () => {
  const { signin, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signin(email, password);
    navigate('/articles');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          placeholder="Email Address"
          autoComplete="off"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {/* TODO: Extract ErrorMessage component */}
      {error && <p className="text-rose-600">{JSON.stringify(error)}</p>}
      {/* TODO: Extract LoadingButton */}
      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading && <Spinner />}
        Sign In
      </button>
    </form>
  );
};
