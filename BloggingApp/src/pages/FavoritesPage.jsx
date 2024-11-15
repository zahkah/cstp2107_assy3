// FavoritesPage.js
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import BlogCard from '../components/BlogCard';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';


const FavoritesPage = () => {
    const [favoriteBlogs, setFavoriteBlogs] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const q = query(collection(db, 'favorites'), where('userId', '==', 'your-user-id')); // Update condition to match your auth
            const querySnapshot = await getDocs(q);
            const blogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFavoriteBlogs(blogs);
        };

        fetchFavorites();
    }, []);

    return (
        <Box padding={3}>
            <Typography variant="h4" gutterBottom>Favorites</Typography>
            {favoriteBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} isFavorite={() => true} toggleFavorite={() => {}} />
            ))}
        </Box>
    );
};

export default FavoritesPage;
