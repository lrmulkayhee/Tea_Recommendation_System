import React, { useEffect, useState } from 'react';
import { Grid, TextField, MenuItem, Button, Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import TeaCard from './TeaCard';

const TeaList = () => {
    const [teas, setTeas] = useState([]);
    const [filteredTeas, setFilteredTeas] = useState([]);
    const [filters, setFilters] = useState({ plant: '', type: '', region: '', healthBenefits: [], flavorProfile: [] });

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

    const handleMultiSelectChange = (name) => (event) => {
        setFilters({ ...filters, [name]: event.target.value });
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
        if (filters.healthBenefits.length > 0) {
            filtered = filtered.filter(tea => filters.healthBenefits.every(benefit => tea.HealthBenefits.includes(benefit)));
        }
        if (filters.flavorProfile.length > 0) {
            filtered = filtered.filter(tea => filters.flavorProfile.every(flavor => tea.FlavorProfile.includes(flavor)));
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
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Filter by Health Benefits</InputLabel>
                        <Select
                            multiple
                            value={filters.healthBenefits}
                            onChange={handleMultiSelectChange('healthBenefits')}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {[...new Set(teas.flatMap(tea => tea.HealthBenefits))].map(benefit => (
                                <MenuItem key={benefit} value={benefit}>
                                    <Checkbox checked={filters.healthBenefits.includes(benefit)} />
                                    <ListItemText primary={benefit} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Filter by Flavor Profile</InputLabel>
                        <Select
                            multiple
                            value={filters.flavorProfile}
                            onChange={handleMultiSelectChange('flavorProfile')}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {[...new Set(teas.flatMap(tea => tea.FlavorProfile))].map(flavor => (
                                <MenuItem key={flavor} value={flavor}>
                                    <Checkbox checked={filters.flavorProfile.includes(flavor)} />
                                    <ListItemText primary={flavor} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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