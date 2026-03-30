import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/Auth';
import { useSnackbar } from '../services/Snackbar';
import ROUTES from '../routes';
import './Login.css';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const passwordMismatch = isSignup && !!confirmPassword && password !== confirmPassword;

  function switchMode(signup: boolean) {
    setIsSignup(signup);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  async function onSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (passwordMismatch) {
      snackbar.error('Passwords do not match');
      return;
    }

    if (isSignup) {
      register(email, password)
        .then(() => {
          snackbar.success('Account created! Please sign in.');
          switchMode(false);
        })
        .catch(err => snackbar.error(err.response?.data?.message ?? 'Registration failed'));
    } else {
      login(email, password)
        .then(() => {
          snackbar.success('Signed in successfully.');
          navigate(ROUTES.RESOURCES);
        })
        .catch(err => snackbar.error(err.response?.data?.message ?? 'Login failed'));
    }
  }

  return (
    <div className="page">
      <h1 className="brand">mobile_forge</h1>

      <div className="card">
        <div className="toggle">
          <button type="button" className={!isSignup ? 'active' : ''} onClick={() => switchMode(false)}>sign_in</button>
          <button type="button" className={isSignup ? 'active' : ''} onClick={() => switchMode(true)}>sign_up</button>
        </div>

        <h2>{isSignup ? 'Create an account' : 'Sign in to your account'}</h2>

        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="email">email_address</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="field">
            <div className="field-header">
              <label htmlFor="password">password</label>
              {!isSignup && <a href="#">forgot_password?</a>}
            </div>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          {isSignup && (
            <div className="field">
              <label htmlFor="confirmPassword">confirm_password</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              {passwordMismatch && <span className="error">passwords do not match</span>}
            </div>
          )}

          <button type="submit" className="submit">
            {isSignup ? 'sign_up' : 'sign_in'}
          </button>
        </form>
      </div>
    </div>
  );
}
