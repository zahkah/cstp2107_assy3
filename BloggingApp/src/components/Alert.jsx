import { Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const Alert = ({
    alertConfig: {
        isOpen = false,
        hideDuration = 6000,
        handleClose,
        message = 'Message',
        location = { vertical: 'bottom', horizontal: 'left' },
        color = 'success'
    }
}) => {
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={hideDuration}
            onClose={handleClose}
            message={message}
            anchorOrigin={location}
            sx={{ '& .MuiSnackbarContent-root': { backgroundColor: color } }} // Apply background color directly
        />
    );
};

Alert.propTypes = {
    alertConfig: PropTypes.shape({
        isOpen: PropTypes.bool,
        hideDuration: PropTypes.number,
        handleClose: PropTypes.func,
        message: PropTypes.string,
        location: PropTypes.shape({
            vertical: PropTypes.oneOf(['top', 'bottom']),
            horizontal: PropTypes.oneOf(['left', 'center', 'right'])
        }),
        color: PropTypes.string // Color can be used to specify the background color of the Snackbar
    })
};

export default memo(Alert);
