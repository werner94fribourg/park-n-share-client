import React from 'react';
import { Container, Grid, Typography, Button, Link } from '@mui/material';
import RectangularButton from '../Boutton/RectangularButton';


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
            <Typography variant="h2" sx={{ marginTop: '10%' , color: 'white'}}>
            Find Your Parking at an affordable price in Switzerland
            </Typography>
           <Link to="/parking">
           <RectangularButton text="BOOK FREE PARKING" />
           </Link>
          </Grid>
        </Grid>
      </Container> 
    </section>
  );
};

export default Banner;
