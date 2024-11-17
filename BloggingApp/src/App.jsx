import './App.css';
import { useRoutes } from 'react-router-dom';
import SignInPage from './pages/Signin';  // Changed from SignIn to Signin to match the file naming in your structure
import SignUpPage from './pages/Signup';  // Changed from SignUp to Signup to match the file naming in your structure
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ViewBlogsPage from './pages/ViewBlogsPage';
import ViewBlogDetailsPage from './pages/ViewBlogDetailsPage';
import FavoritesPage from './pages/ViewFavoritesPage';  // Make sure the file is named ViewFavoritesPage and not FavoritesPage
import Navbar from './components/Navbar';

function App() {
  // React Router Setup
  const routes = useRoutes([
    { path: '/', element: <SignInPage /> },
    { path: '/signup', element: <SignUpPage /> },
    { path: '/home', element: <HomePage /> },
    { path: '/viewblogs', element: <ViewBlogsPage /> },
    { path: '/viewblogs/:id', element: <ViewBlogDetailsPage /> },
    { path: '/favorites', element: <FavoritesPage /> }, 
    { path: '*', element: <NotFoundPage /> }
  ]);

  return (
    <>
      <Navbar />
      {routes}
    </>
  );
}

export default App;
