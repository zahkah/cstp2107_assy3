import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, onSnapshot, deleteDoc, setDoc, doc } from 'firebase/firestore';
import { Box, Button, Divider, Typography } from '@mui/material';
import BlogCard from '../components/BlogCard';
import Alert from '../components/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const ViewFavoritePage = () => {
    const [currentUser] = useLocalStorage('current_user', null);
    const [favoritesList, setFavoritesList] = useState([]);
    const [alertConfig, setAlertConfig] = useState({});
    const navigate = useNavigate();

    const favoriteBlogCollectionReference = collection(db, "favorites");

    // Getting the list of favorites for the current user
    useEffect(() => {
        if (currentUser) {
            const q = query(favoriteBlogCollectionReference, where('userId', '==', currentUser.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const favBlogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFavoritesList(favBlogs);
            });

            return () => unsubscribe(); // Clean up on unmount
        }
    }, [currentUser]);

    const handleFavoriteToggle = async (blog) => {
        const favoriteDocRef = doc(favoriteBlogCollectionReference, `${currentUser.uid}_${blog.id}`);
        if (favoritesList.some(f => f.id === blog.id)) {
            // Remove from favorites
            await deleteDoc(favoriteDocRef);
            setFavoritesList(favoritesList.filter(f => f.id !== blog.id));
            setAlertConfig({ message: 'Removed from favorites', color: 'success', isOpen: true });
        } else {
            // Add to favorites
            await setDoc(favoriteDocRef, { userId: currentUser.uid, ...blog });
            setFavoritesList([...favoritesList, blog]);
            setAlertConfig({ message: 'Added to favorites', color: 'success', isOpen: true });
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/home')}>
                Back
            </Button>
            <Typography variant="h3">Your Favorite Blogs</Typography>
            <Divider />
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="12px">
                {favoritesList.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        toggleFavorite={() => handleFavoriteToggle(blog)}
                    />
                ))}
            </Box>
            {alertConfig.isOpen && <Alert alertConfig={alertConfig} />}
        </Box>
    );
};

export default ViewFavoritePage;
