import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Button, Box, Divider, Typography } from '@mui/material';
import BlogCard from '../components/BlogCard';
import Alert from '../components/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const ViewFavoritePage = () => {
    const [currentUser] = useLocalStorage('current_user', null);
    const favoritesCollectionRef = collection(db, "favorites");
    const [favoritesList, setFavoritesList] = useState([]);
    const [alertConfig, setAlertConfig] = useState({});
    const navigate = useNavigate();

    // Fetch the list of favorite blogs from Firestore
    const fetchFavorites = async () => {
        if (!currentUser) return;
        const querySnapshot = await getDocs(favoritesCollectionRef);
        const favorites = querySnapshot.docs
            .filter(doc => doc.data().userId === currentUser.uid)
            .map(doc => ({ id: doc.id, ...doc.data().blog }));
        setFavoritesList(favorites);
    };

    // Function to remove a blog from favorites
    const removeFavorite = async (blogId) => {
        const favoriteDocRef = doc(db, "favorites", `${currentUser.uid}_${blogId}`);
        try {
            await deleteDoc(favoriteDocRef);
            setFavoritesList(prev => prev.filter(favorite => favorite.id !== blogId));
            setAlertConfig({ isOpen: true, message: 'Removed from favorites', color: 'success' });
        } catch (error) {
            setAlertConfig({ isOpen: true, message: 'Error removing from favorites', color: 'error' });
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Button onClick={() => navigate('/home')} startIcon={<ArrowBackIcon />}>Back</Button>
            <Typography variant="h3" gutterBottom>View Your Favorite Blogs</Typography>
            <Divider />
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="12px">
                {favoritesList.map((blog, index) => (
                    <BlogCard
                        key={index}
                        blog={blog}
                        showDeleteIcon={true}
                        deleteBlog={() => removeFavorite(blog.id)}
                    />
                ))}
            </Box>
            {alertConfig.isOpen && <Alert alertConfig={alertConfig} />}
        </Box>
    );
};

export default ViewFavoritePage;
