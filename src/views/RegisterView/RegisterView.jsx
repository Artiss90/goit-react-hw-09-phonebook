import Alert from 'Components/Alert/Alert';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';
import styles from './RegisterView.module.css';
import fadeScale from 'transitionsCSS/fade.module.css';
import { CSSTransition } from 'react-transition-group';

function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [password, setPassword] = useState('');
  const authError = Boolean(useSelector(authSelectors.getErrorMessage));

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
    setShowAlert(true);
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
    setTimeout(() => {
      setShowAlert(false);
    }, 5000); // * hidden error by 5 sec
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
            required
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
            required
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            type="password"
            name="password"
            placeholder="at least 7 characters"
            minLength="7"
            value={password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </label>

        <button type="submit">Register now</button>
      </form>
      <CSSTransition
        //TODO Анимация появления-исчезания предупреждения
        in={showAlert && authError}
        timeout={500}
        classNames={fadeScale}
        unmountOnExit
      >
        <Alert message="a user with this mail already exists" />
      </CSSTransition>
    </div>
  );
}

export default RegisterView;
