import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Container, Grid, Modal, Skeleton, Typography, Button } from '@mui/material';

const ParkingPageSkeleton = () => {
  const [loading, setLoading] = useState(true);
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      const fakeData = Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        name: `Parking Spot ${index + 1}`,
        description: 'Free parking available',
        capacity: '10',
        availability: '8',
        details: `This is a free parking spot available for 10 cars. Currently, 8 spaces are available for parking.`,
      }));
      setSpots(fakeData);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = (spot) => {
    setSelectedSpot(spot);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>
          Free Parking Available
        </Typography>
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 12 }, (_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        <Skeleton />
                      </Typography>
                      <Typography variant="subtitle2">
                        <Skeleton />
                      </Typography>
                      <Typography variant="h5" color="textSecondary">
                        Capacity: <Skeleton width="50%" />
                      </Typography>
                      <Typography variant="h5" color="textSecondary">
                        Availability: <Skeleton width="40%" />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : spots.map((spot) => (
                <Grid item xs={12} sm={6} md={4} key={spot.id}>
                  <Card>
                    <CardContent onClick={() => handleOpen(spot)} style={{ cursor: 'pointer' }}>
                      <Typography variant="h5">{spot.name}</Typography>
                      <Typography variant="h6">{spot.description}</Typography>
                      <Typography variant="h6" color="textSecondary">
                        Capacity: {spot.capacity}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        Availability: {spot.availability}
                      </Typography>
                      {/*<Button style={{}} variant="contained" color="primary">
                        Réserver
                       </Button>*/}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            width: '40%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">{selectedSpot?.name}</Typography>
          <Typography variant="body1">{selectedSpot?.details}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Réserver
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ParkingPageSkeleton;
