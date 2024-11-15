//import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Navbar = () => {
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.log("Error signing out: ", error);
        }
    }

    const handleNavigateToFavorites = () => {
        navigate('/favorites');
    }

    return (
        <AppBar position="static" style={{ marginBottom: '20px' }}>
            <Toolbar>
                <Box display="flex" flexGrow={1} alignItems="center">
                    <Button color="inherit" onClick={() => navigate('/home')}>Home</Button>
                    <Button color="inherit" onClick={() => navigate('/viewblogs')}>View Blogs</Button>
                    <Button color="inherit" onClick={handleNavigateToFavorites}>View Favorites</Button>
                </Box>
                <Button color="inherit" onClick={handleSignout} variant="outlined" style={{ color: 'white', border: '1px solid white' }}>Sign Out</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
