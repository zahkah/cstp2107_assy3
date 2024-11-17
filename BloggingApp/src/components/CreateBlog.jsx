import React, { useState } from 'react';
import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Alert from './Alert';
import { Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const categories = ['Tech', 'News', 'Sports', 'Science'];

const CreateBlog = () => {
    const [currentUser, setCurrentUser] = useLocalStorage('current_user', null);

    const [blogInfo, setBlogInfo] = useState({
        userId: currentUser?.uid, 
        title: '',
        description: '',
        image: '',
        category: ''
    });

    const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: '', color: 'info' });

    const blogCollectionReference = collection(db, "blogs");

    const handleCreateBlog = async (event) => {
        event.preventDefault(); 

        if (!blogInfo.title || !blogInfo.description || !blogInfo.category) {
            setAlertConfig({ isOpen: true, message: 'Please fill in all fields', color: 'error' });
            return;
        }

        try {
            await addDoc(blogCollectionReference, blogInfo);
            setAlertConfig({ isOpen: true, message: 'Successfully Created a blog', color: 'success' });
            // Optionally reset form fields after successful blog creation
            setBlogInfo({ userId: currentUser?.uid, title: '', description: '', image: '', category: '' });
        } catch (error) {
            console.error("Error adding document: ", error);
            setAlertConfig({ isOpen: true, message: `There was an error creating the blog: ${error.message}`, color: 'error' });
        }
    };

    return (
        <Box component="form" onSubmit={handleCreateBlog} sx={{ border: '1px solid black', padding: '50px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography variant="h4">Create Your Own Blog</Typography>
            <TextField
                required
                label="Blog Title"
                placeholder="Enter Blog Title here!"
                value={blogInfo.title}
                onChange={(e) => setBlogInfo({ ...blogInfo, title: e.target.value })}
            />
            <TextField
                required
                label="Blog Description"
                placeholder="Enter Blog Description here!"
                multiline
                rows={4}
                value={blogInfo.description}
                onChange={(e) => setBlogInfo({ ...blogInfo, description: e.target.value })}
            />
            <TextField
                label="Image URL"
                placeholder="Please paste the URL of the image"
                value={blogInfo.image}
                onChange={(e) => setBlogInfo({ ...blogInfo, image: e.target.value })}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        onClick={() => setBlogInfo({ ...blogInfo, category })}
                        variant={blogInfo.category === category ? 'filled' : 'outlined'}
                        color={blogInfo.category === category ? 'primary' : 'default'}
                    />
                ))}
            </Box>
            <Button type="submit" variant="contained" color="primary">Create Blog</Button>
            <Alert alertConfig={alertConfig} />
            <Link to="/viewblogs" style={{ marginTop: '20px', textDecoration: 'none' }}>View Blogs</Link>
        </Box>
    );
}

export default CreateBlog;
