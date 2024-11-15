import './App.css';
import { useRoutes } from 'react-router-dom';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ViewBlogsPage from './pages/ViewBlogsPage';
import ViewBlogDetailsPage from './pages/ViewBlogDetailsPage';
import FavoritesPage from './pages/FavoritesPage'; // Import the new FavoritesPage
import Navbar from './components/Navbar';

function App() {
  // React Router Setup
  const routes = useRoutes([
    { path: '/', element: <SignInPage /> },
    { path: '/signup', element: <SignUpPage /> },
    { path: '/home', element: <HomePage /> },
    { path: '/viewblogs', element: <ViewBlogsPage /> },
    { path: '/viewblogs/:id', element: <ViewBlogDetailsPage /> },
    { path: '/favorites', element: <FavoritesPage /> }, // New route for FavoritesPage
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
