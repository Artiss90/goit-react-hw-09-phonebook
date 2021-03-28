import Alert from 'Components/Alert/Alert';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';
import styles from './RegisterView.module.css';

function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authError = useSelector(authSelectors.getErrorMessage);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Registration page</h1>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
        autoComplete="new-password"
      >
        <label className={styles.label}>
          Username
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>

        <label className={styles.label}>
          E-mail
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            type="password"
            name="password"
            placeholder="at least 7 characters"
            value={password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>

        <button type="submit">Register now</button>
      </form>
      {authError && <Alert message="a user with this mail already exists" />}
    </div>
  );
}

export default RegisterView;
