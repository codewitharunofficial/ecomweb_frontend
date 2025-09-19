import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Rating,
  Divider,
} from "@mui/material";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductDetailsComponent = ({ name, price, description, rating, image, }) => {

  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const handleAddToCart = () => {
    setCart((prevCart) => [...prevCart, { name, price, description, rating, image }]);
    toast.success('Item Added To Cart');
    localStorage.setItem('cart', JSON.stringify([...cart, { name, price, description, rating, image }]));
  }

  const handleBuyNow = () => {
    setCart((prevCart) => [...prevCart, { name, price, description, rating, image }]);
    navigate('/user/cart');
  }

  return (
    <Card
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        boxShadow: 5,
        backgroundColor: "#fff",
        maxWidth: "1100px",
        margin: "auto",
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{
              borderRadius: 3,
              width: "100%",
              height: { xs: 250, sm: 320, md: 420 },
              objectFit: "fill",
              boxShadow: 2,
            }}
          />
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <CardContent sx={{ p: { xs: 1, md: 2 } }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "1.3rem", md: "1.75rem" } }}
            >
              {name}
            </Typography>

            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", md: "1.4rem" } }}
            >
              {price.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.6, fontSize: { xs: "0.9rem", md: "1rem" } }}
            >
              {description}
            </Typography>

            {/* Rating */}
            {rating && (
              <Box display="flex" alignItems="center" mb={2}>
                <Rating value={rating} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {rating}/5
                </Typography>
              </Box>
            )}

            {/* Action Buttons */}
            <Box display="flex" flexWrap="wrap" gap={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  px: { xs: 3, md: 4 },
                  flex: { xs: 1, sm: "auto" },
                }}
                onClick={() => handleAddToCart()}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  px: { xs: 3, md: 4 },
                  flex: { xs: 1, sm: "auto" },
                }}
                onClick={() => handleBuyNow()}
              >
                Buy Now
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductDetailsComponent;
