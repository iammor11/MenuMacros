// pages/[country]/[restaurant].js
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar'; // Adjust the path as necessary
import theme from '../../../themes/theme'; // Adjust the path as necessary based on your file structure
import { useRouter } from 'next/router';
import restaurantData from '../../../data/restaurants_ca'; // adjust the path as necessary
import { Container, Typography, List, ListItem, ListItemText, ThemeProvider, Paper, Grid, Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import Head from 'next/head'; // Also, include the Google Font link in your component using Head from 'next/head'

export default function Restaurant() {
  const router = useRouter();
  const { country, restaurant, sort } = router.query; // Assuming `sort` is now part of the URL path

  const [sortOption, setSortOption] = useState(sort || 'high-protein');

  useEffect(() => {
    if (sort) {
      setSortOption(sort);
    }
  }, [sort]);

//   console.log("menu", restaurantData[0]);

  const handleSortChange = (sortOption) => {
    // Assuming `country` and `restaurant` are available from the router or context
    const { country, restaurant } = router.query;

    // Update the URL with the new sort option as part of the path
    router.push(`/${country}/${restaurant}/${sortOption}`);
  };

  // Find the restaurant data by country and name
  const selectedResturant = restaurantData.find(
    (r) => {
      return restaurant && r.name.toLowerCase() === restaurant.replace(/-/g, ' ');
    }
  );

  if (!selectedResturant) {
    return <div>Loading...</div>;
  }

  const sortedMenu = selectedResturant.menu.sort((a, b) => {
    switch (sortOption) {
      case 'high-protein':
        return b.percent_protein - a.percent_protein;
      case 'low-carb':
        return a.percent_carb - b.percent_carb;
      // Add more cases as needed
      default:
        return 0;
    }
  });

  // Filter the sortedMenu to include only items with at least 50 calories
  const filteredSortedMenu = sortedMenu.filter(item => item.calories >= 50);

  return (
    <>

      <Head>
        <title>{selectedResturant?.name ? `${selectedResturant.name} 🍽️ | Menu Macros` : 'Restaurant | Menu Macros'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
      <Navbar /* You will need to pass the appropriate props here */ />
      
      <Paper 
          elevation={0}
          style={{ padding: '40px 20px', margin: '20px 0', backgroundColor: theme.palette.background.default }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                  {selectedResturant?.name || 'Restaurant'}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="sort-select-label">Sort By</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    value={sortOption}
                    label="Sort By"
                    onChange={(event) => handleSortChange(event.target.value)}
                  >
                    <MenuItem value="high-protein">High Protein (%)</MenuItem>
                    <MenuItem value="low-carb">Low Carbs (%)</MenuItem>
               
                  </Select>
                </FormControl>
              </Grid>

            </Grid>
          </Paper>
      <Container maxWidth="md">

        

        <List style={{ margin: '0 15px' }}>
          {filteredSortedMenu.map((item, index) => (
            <ListItem key={index} style={{ 
              marginBottom: '20px', 
              backgroundColor: theme.palette.background.paper, 
              borderRadius: '12px',
            }}>
              <ListItemText 
                primary={
                  <Typography variant="h6" style={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                    {`${item.item}${item.size ? ` (${item.size})` : ''}`}
                  </Typography>
                } 
                secondary={`Calories: ${item.calories}, Protein: ${item.protein}, Carbs: ${item.carbs}, Fat: ${item.fat}`} 
                style={{ textDecoration: 'none' }} 
              />
            </ListItem>
          ))}
        </List>
      </Container>
      </ThemeProvider>
    </>
  );
}

