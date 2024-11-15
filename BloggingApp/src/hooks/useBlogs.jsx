// import { useState, useEffect } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../firebaseConfig';

// const useBlogs = () => {
//     const [blogsList, setBlogsList] = useState([]);
//     const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: '', color: '' });

//     const getBlogsList = async () => {
//         try {
//             const blogCollectionReference = collection(db, "blogs");
//             const querySnapshot = await getDocs(blogCollectionReference);
//             const blogs = querySnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setBlogsList(blogs);
//         } catch (error) {
//             console.error('Error fetching blogs:', error);
//             setAlertConfig({ isOpen: true, message: 'Failed to fetch blogs', color: 'error' });
//         }
//     };

//     useEffect(() => {
//         getBlogsList();
//     }, []);

//     return { blogsList, alertConfig, refreshBlogs: getBlogsList };
// };

// export default useBlogs;
