import React, { useEffect, useState } from 'react';
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import TeaCard from './TeaCard';

const TeaList = () => {
    const [teas, setTeas] = useState([]);
    const [filteredTeas, setFilteredTeas] = useState([]);
    const [filters, setFilters] = useState({ plant: '', type: '', region: '' });

    useEffect(() => {
        fetch('/teas')
            .then(response => response.json())
            .then(data => {
                setTeas(data);
                setFilteredTeas(data);
            });
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        let filtered = teas;
        if (filters.plant) {
            filtered = filtered.filter(tea => tea.Plant === filters.plant);
        }
        if (filters.type) {
            filtered = filtered.filter(tea => tea.Type === filters.type);
        }
        if (filters.region) {
            filtered = filtered.filter(tea => tea.region === filters.region);
        }
        setFilteredTeas(filtered);
    };

    return (
        <div>
            <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        label="Filter by Plant"
                        name="plant"
                        value={filters.plant}
                        onChange={handleFilterChange}
                        fullWidth
                    >
                        <MenuItem value="">Select Plant</MenuItem>
                        {[...new Set(teas.map(tea => tea.Plant))].map(plant => (
                            <MenuItem key={plant} value={plant}>{plant}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        label="Filter by Type"
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        fullWidth
                    >
                        <MenuItem value="">Select Type</MenuItem>
                        {[...new Set(teas.map(tea => tea.Type))].map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        label="Filter by Region"
                        name="region"
                        value={filters.region}
                        onChange={handleFilterChange}
                        fullWidth
                    >
                        <MenuItem value="">Select Region</MenuItem>
                        {[...new Set(teas.map(tea => tea.region))].map(region => (
                            <MenuItem key={region} value={region}>{region}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={applyFilters}>
                        Apply Filters
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {filteredTeas.map(tea => (
                    <Grid item xs={12} sm={6} md={4} key={tea.name}>
                        <TeaCard tea={tea} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TeaList;