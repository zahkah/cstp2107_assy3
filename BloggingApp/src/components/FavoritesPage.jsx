import React from 'react';
import { useAuth } from './path/to/auth/hooks'; // Adjust the import path as necessary
import BlogCard from './components/BlogCard';
import { useFetchFavorites } from './hooks/useFetchFavorites'; // Ensure the path is correct

const FavoritesPage = () => {
    const { user } = useAuth(); // Your method of getting the current user
    const favorites = useFetchFavorites(user?.uid); // Fetch favorites using the user's UID

    return (
        <div>
            <h1>My Favorites</h1>
            {favorites.map(favorite => (
                <BlogCard key={favorite.id} blogId={favorite.blogId} />
                // Assume BlogCard is adapted to take a blogId and fetch/display the blog details
            ))}
        </div>
    );
};

export default FavoritesPage;
