import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TeaCard = ({ tea }) => {
    return (
        <Card style={{ marginBottom: '20px' }}>
            <CardContent>
                <Typography variant="h5">{tea.name}</Typography>
                <Typography variant="body2" color="textSecondary">{tea.description}</Typography>
                <Typography variant="body2" color="textSecondary">Origin: {tea.origin}</Typography>
            </CardContent>
        </Card>
    );
};

export default TeaCard;