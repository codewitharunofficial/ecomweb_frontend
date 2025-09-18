import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useCart } from "../../context/Cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import * as emoji from "node-emoji";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../Components/Layout/Loader";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Divider,
  Paper,
} from "@mui/material";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [initiating, setInitiating] = useState(false);
  const navigate = useNavigate();

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      toast.success("Item Removed From Cart");
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => (total += item.price));
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutHandler = async () => {
    setInitiating(true);
    const {
      data: { key },
    } = await axios.get(`${process.env.REACT_APP_API}/api/get-key`);

    const {
      data: { order, Order },
    } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/payment/create-order`,
      { cart, auth }
    );

    setInitiating(false);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Shopyse",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
        const verifyUrl = `${process.env.REACT_APP_API}/api/v1/payment/confirm-payment`;
        const { data } = await axios.post(verifyUrl, {
          response,
          Order_Id: Order?._id,
        });
        if (data?.success) {
          toast.success(
            data?.message + ` Reference No. ${data?.payment?.paymentId}`
          );
          localStorage.removeItem("cart");
          navigate(`/dashboard/user/orders`);
        }
      },
      prefill: {
        name: auth?.user?.name,
        email: auth?.user?.email,
        contact: auth?.user?.phone,
      },
      notes: {
        address: auth?.user?.address,
      },
      theme: { color: "#121212" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Layout title="Shopease - Cart">
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ bgcolor: "secondary.main", color: "white", p: 1, borderRadius: 2 }}
        >
          {auth?.token
            ? emoji.emojify(`Hello ${auth.user.name} :smile:!!`)
            : "You're Not Logged in, Please Login To Checkout"}
        </Typography>

        <Typography align="center" sx={{ mt: 1, mb: 3 }} variant="subtitle1">
          {cart?.length > 0
            ? `You have ${cart.length} item(s) in your Cart`
            : "Your Cart Is Empty"}
        </Typography>

        <Grid container spacing={2}>
          {cart?.map((p) => (
            <Grid item xs={12} md={6} key={p._id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: 160 },
                    height: { xs: 180, sm: 160 },
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                  image={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`}
                  alt={p.name}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{p.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.description.slice(0, 50)}...
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    Price:{" "}
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Cart Summary */}
        <Paper
          elevation={4}
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            maxWidth: 500,
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Cart Summary
          </Typography>
          <Divider sx={{ my: 2 }} />

          {!cart.length ? (
            <Typography>
              No Items To Show {emoji.emojify(`:robot:`)}
            </Typography>
          ) : (
            <Typography variant="h6">Total: {totalPrice()}</Typography>
          )}

          {cart.length > 0 && auth?.user?.address && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">{auth?.user?.address}</Typography>
              <Button
                variant="contained"
                color="warning"
                sx={{ mt: 1 }}
                onClick={() =>
                  navigate("/dashboard/user/myprofile", { state: "/user/cart" })
                }
              >
                Update Address
              </Button>
            </Box>
          )}

          {!auth?.token && cart.length > 0 && (
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={() => navigate("/user/login", { state: "/user/cart" })}
            >
              Login to proceed
            </Button>
          )}

          {cart.length > 0 && auth?.token && (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={checkoutHandler}
            >
              {initiating ? <Loader /> : "Checkout"}
            </Button>
          )}
        </Paper>
      </Box>
    </Layout>
  );
};

export default Cart;
