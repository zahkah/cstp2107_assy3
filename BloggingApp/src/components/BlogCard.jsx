import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog, deleteBlog, toggleFavorite, isFavorite, showDeleteIcon = true }) => {
    const navigate = useNavigate();

    // Handle favorite button click
    const handleFavoriteClick = () => {
        toggleFavorite(blog.id);
    };

    return (
        <Card style={{ position: 'relative' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={blog.image || 'placeholder-image-url'} // Provide a placeholder if blog.image is undefined
                title={blog.title || 'Blog Image'}
            />
            {showDeleteIcon && (
                <IconButton
                    style={{ position: 'absolute', right: '10px', top: '5px' }}
                    aria-label="delete"
                    size="small"
                    onClick={() => deleteBlog(blog.id)}
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {blog.description}
                </Typography>
                <Chip label={blog.category} variant="outlined" />
            </CardContent>
            <CardActions>
                <IconButton
                    onClick={handleFavoriteClick}
                    color={isFavorite ? 'error' : 'default'}
                >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate(`/viewblogs/${blog.id}`)}
                >
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
