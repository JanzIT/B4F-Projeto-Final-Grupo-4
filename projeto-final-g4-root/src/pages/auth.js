import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setLoginMessage('');
        router.push('/intro');
      } else {
        setLoginMessage(response.data.message);
      }
    } catch (error) {
      setLoginMessage('Login failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Login</button>
        <p>Don't have an account?</p>
        <button type="button" onClick={() => router.push('/register')} className={styles.button}>Register</button>
        {loginMessage && <p className={styles.errorMessage}>{loginMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
