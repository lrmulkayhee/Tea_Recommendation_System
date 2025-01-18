import React from 'react';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Tea Recommendation System
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </Container>
    );
};

export default Layout;