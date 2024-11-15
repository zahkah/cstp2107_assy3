import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Box, Divider, Typography, Button } from '@mui/material';
import BlogCard from '../components/BlogCard';
import Alert from '../components/Alert';

const ViewBlogsPage = () => {
    const [blogsList, setBlogsList] = useState([]);
    const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: '', color: '' });

    const getBlogsList = async () => {
        try {
            const blogs = await getDocs(collection(db, "blogs"));
            setBlogsList(blogs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setAlertConfig({ isOpen: true, message: 'Failed to fetch blogs', color: 'error' });
        }
    };

    const deleteBlog = async (id) => {
        try {
            await deleteDoc(doc(db, "blogs", id));
            setBlogsList(currentBlogs => currentBlogs.filter(blog => blog.id !== id));
            setAlertConfig({ isOpen: true, message: 'Successfully deleted the blog', color: 'success' });
        } catch (error) {
            console.error('Error deleting blog:', error);
            setAlertConfig({ isOpen: true, message: 'Error deleting the blog', color: 'error' });
        }
    };

    useEffect(() => {
        getBlogsList();
    }, []);

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h3">View Blogs</Typography>
            <Divider />
            <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="12px">
                {blogsList.map(blog => (
                    <BlogCard key={blog.id} blog={blog} deleteBlog={deleteBlog} />
                ))}
            </Box>
            {alertConfig.isOpen && (
                <Alert alertConfig={alertConfig} onClose={() => setAlertConfig({ ...alertConfig, isOpen: false })} />
            )}
        </Box>
    );
};

export default ViewBlogsPage;
