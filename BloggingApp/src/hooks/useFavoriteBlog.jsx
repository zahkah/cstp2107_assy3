import React from 'react';
import { useFetchFavorites } from '../hooks/useFetchFavorites';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an authentication context

const FavoritesComponent = () => {
  const { currentUser } = useAuth(); // Retrieve the current user from context
  const favorites = useFetchFavorites(currentUser?.uid);

  return (
    <div>
      <h1>Your Favorites</h1>
      <ul>
        {favorites.map(fav => (
          <li key={fav.id}>{fav.title}</li> // Assuming your favorites have a 'title' field
        ))}
      </ul>
    </div>
  );
};

export default FavoritesComponent;
