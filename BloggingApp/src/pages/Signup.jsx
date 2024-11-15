import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Link } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';
import { getErrorCode } from '../utils';

const SignupPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [alertConfig, setAlertConfig] = useState({});
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
            if (user) {
                setAlertConfig({ message: 'Successfully Signed up', color: 'success', isOpen: true });
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (error) {
            const message = getErrorCode(error.code);
            setAlertConfig({ message, color: 'error', isOpen: true });
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSignup();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
                <Typography variant="h5">Sign up</Typography>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    margin="normal"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
                <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    margin="normal"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                </Button>
                <Alert alertConfig={alertConfig} />
                <Link href="/" variant="body2">
                    Already have an account? Sign in
                </Link>
            </Box>
        </Container>
    );
};

export default SignupPage;
