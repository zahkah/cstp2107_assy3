import React from 'react';
import CreateBlog from '../components/CreateBlog';
import { Container, Typography } from '@mui/material';


const HomePage = () => {
    return (
        <Container>
            <Typography variant="h4" style={{ marginTop: '20px', textAlign: 'center' }}>Welcome to the Blogging Platform</Typography>
            <CreateBlog />
        </Container>
    );
}

export default HomePage;
