import React from 'react';
import { Container, Grid, Typography, Button, Link } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const Banner = () => {
  const sectionStyle = {
    backgroundImage: 'url("https://i.postimg.cc/CL1p9Sdq/city-square.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', // Center the background image
    height: '50vh', // Define the height of the section
  };
  
      

  return (
    <section id="other" style={sectionStyle}>
      <Container>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} textAlign="center">
            <br />
            <Typography variant="h2" sx={{ marginTop: '10%' , color: 'white'}}>
            Find Your Parking at an affordable price in Switzerland
            </Typography>

            <br />
            
            
            <Button variant="contained" endIcon={<SendIcon />}>
            <Typography variant="h3">BOOK FREE PARKING</Typography>
            </Button>

          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Banner;
