import { useState, useEffect } from 'react';
import { Container, Typography, TextField, MenuItem, List, ListItem, ListItemText, Card, CardContent, ThemeProvider, Box, Grid, Paper } from '@mui/material';
import restaurants_ca from '../data/restaurants_ca'; 
import restaurants_us from '../data/restaurants_us'; 
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import theme from '../themes/theme'; // Adjust the path based on your file structure

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("ca");
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const restaurants = selectedCountry === 'ca' ? restaurants_ca : restaurants_us;
    const filtered = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm));
    setFilteredRestaurants(filtered);
  }, [selectedCountry, searchTerm]);

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <Head>
        <title>Menu Macros</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* Replace AppBar with Navbar */}
        <Navbar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        <Container maxWidth="lg" style={{ padding: '20px 0', backgroundColor: theme.palette.background.default }}>
          {/* Hero Section */}
          <Paper 
          elevation={0}
          style={{ padding: '40px 20px', margin: '20px 0', backgroundColor: theme.palette.background.default }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h3" component="h1" gutterBottom style={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                  Find Your Next Meal 🍽️
                </Typography>
                <Typography variant="h6" style={{ color: theme.palette.text.secondary }}>
                  Get macro friendly menu options at any restaurant.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    color="primary"
                    placeholder="Search Restaurants"
                    onChange={(event) => setSearchTerm(event.target.value.toLowerCase())}
                    style={{ backgroundColor: '#ffffff', marginTop: '20px' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Restaurant List */}
          <List
          // add margin to left and right 10px
          style={{ margin: '0 15px' }}
          >
            {filteredRestaurants.map((restaurant, index) => (
              <Link 
                key={index} 
                href={`/${selectedCountry}/${encodeURIComponent(restaurant.name.replace(/\s+/g, '-').toLowerCase())}/high-protein`}
                passHref
                // remove the underline
                style={{ textDecoration: 'none' }}
              >
                <Card  style={{ 
                  marginBottom: '20px', 
                  backgroundColor: theme.palette.background.paper, 
                  borderRadius: '12px',
                }}>
                  <CardContent>
                    <ListItem disableGutters component="a" style={{ textDecoration: 'none' }}> {/* Add style here */}
                      <ListItemText 
                        primary={<Typography variant="h6" style={{ fontWeight: 'bold', color: theme.palette.text.primary,
                        
                      
                      }}>{restaurant.name}</Typography>} 
                        secondary={`Menu Items: ${restaurant.menu.length}`} 
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              </Link> 
            ))}
          </List>
        </Container>
      </ThemeProvider>
    </div>
  );
}

