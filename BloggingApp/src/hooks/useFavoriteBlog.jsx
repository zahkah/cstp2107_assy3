// import { useEffect, useState, useContext } from 'react';
// import { db } from '../firebaseConfig';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';
// import { AuthContext } from '../contexts/AuthContext'; // Assuming you have an Auth context

// const useFavoriteBlogs = () => {
//     const { user } = useContext(AuthContext); // Get user from context
//     const [favoriteBlogs, setFavoriteBlogs] = useState([]);

//     useEffect(() => {
//         if (user) {
//             const favRef = collection(db, 'favorites');
//             const q = query(favRef, where('userId', '==', user.uid));
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const blogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 setFavoriteBlogs(blogs);
//             });

//             return () => unsubscribe(); // Clean up subscription
//         }
//     }, [user]);

//     return favoriteBlogs;
// };

// export default useFavoriteBlogs;
