import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "./UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { emojify } from "node-emoji";

import {
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Divider,
} from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const {
        data: { Order },
      } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/orders/all-orders`,
        { userId: auth?.user?._id }
      );
      if (Order) {
        setOrders(Order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Ecommerce App - Orders">
      <Grid container spacing={3} sx={{ p: 3 }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <UserMenu />
        </Grid>

        {/* Orders */}
        <Grid item xs={12} md={9}>
          <Typography variant="h5" align="center" gutterBottom>
            All Orders
          </Typography>

          {orders.length > 0 ? (
            orders.map((o, idx) => (
              <Paper
                key={o._id}
                sx={{ mb: 4, p: 2, borderRadius: 2, boxShadow: 3 }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    Order #{idx + 1} - Status: {o.status}
                  </Typography>
                  <Typography variant="subtitle2">
                    Buyer: {o?.buyers?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {moment(o?.createdAt).fromNow()}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  {o?.products?.map((p) => (
                    <Grid item xs={12} md={6} key={p._id}>
                      <Card sx={{ display: "flex", borderRadius: 2 }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 150, objectFit: "fill" }}
                          image={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`}
                          alt={p.name}
                        />
                        <CardContent sx={{ flex: 1 }}>
                          <Typography variant="h6">{p.name}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {p.description.slice(0, 50)}...
                          </Typography>
                          <Typography variant="body1" color="primary">
                            Price:{" "}
                            {p.price.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                o?.payment === "Completed" ? "green" : "red",
                            }}
                          >
                            Payment: {o?.payment}
                          </Typography>
                          <Typography variant="body2">
                            Quantity: {o?.products?.length}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              <Typography variant="h6" align="center">
                Nothing to Show {emojify(" :disappointed: !!")} Shop Now{" "}
                {emojify(" :handshake: ")}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Orders;
