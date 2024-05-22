import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css'; // Importando o módulo CSS

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const router = useRouter();

    const goToLogin = async () => {
        router.push('/auth');
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            if (password !== passwordConfirmation) {
                setRegisterMessage('Passwords do not match');
                return;
            }

            const response = await axios.post('/api/auth/register', {
                userInfo: {
                    username,
                    email,
                    password,
                },
            });

            if (!response.data.success) {
                setRegisterMessage(response.data.message);
                return;
            }

            setRegisterMessage('');
            router.push('/auth');
        } catch (error) {
            setRegisterMessage('Registration failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register</h1>
            <form onSubmit={handleRegister}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
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
                <div className={styles.formGroup}>
                    <label htmlFor="passwordConfirmation" className={styles.label}>Confirm Password:</label>
                    <input
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Register</button>
                <p>Already have an account? <span className={styles.link} onClick={() => goToLogin()} style={{ cursor: 'pointer' }}>Login</span></p>
                {registerMessage && <p className={styles.errorMessage}>{registerMessage}</p>}
            </form>
        </div>
    );
};

export default Register;
