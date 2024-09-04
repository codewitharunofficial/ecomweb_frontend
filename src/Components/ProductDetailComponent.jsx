import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Container,
  Rating
} from '@mui/material';
import { styled } from '@mui/system';

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '500px',
  },
}));

const ProductDetailsComponent = ({name, price, description, rating, image}) => {
  rating = 4;

  return (
    <Container maxWidth="xl" sx={{backgroundColor: 'linear-gradient(0deg, rgba(34,195,178,1) 13%, rgba(45,170,253,1) 71%)'}}>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 4, backgroundColor: 'linear-gradient(0deg, rgba(34,195,178,1) 13%, rgba(45,170,253,1) 71%)' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <ImageContainer component="img" style={{height: '80%'}} src={image} alt={name} />
            {
                rating && (
                    <Rating value={rating} readOnly />
                )
            }
            <Typography variant="h6" color="textSecondary" sx={{ marginY: 2 }}>
              {price?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography variant="h4" component="h1">
              {name}
            </Typography>
            <Typography variant="body1" paragraph sx={{height: '80vh', overflowY: "auto", paddingBottom: '5%'}}>
              {description}
            </Typography>
            <Box className="p-details d-flex flex-row" component="div" style={{backgroundColor: "yellow", alignItems: 'center', justifyContent: 'space-between', height: 'auto', padding: 10, width: '100%', alignSelf: 'center',}} >
            <Button variant="contained" color="warning" sx={{width: 'auto', flex: 0.45}} >
              Wishlist
            </Button>
            <Button variant="contained" color="primary" sx={{flex: 0.45}} >
              Buy Now
            </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
          
    </Container>
  );
};

export default ProductDetailsComponent;
