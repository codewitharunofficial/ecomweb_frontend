import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

const Products = () => {
  const [product, setProduct] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product`
      );

      if (data?.success) {
        setProduct(data?.products);
      }
    } catch (error) {
      toast.error("Error While Getting Products");
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb", p: 3 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
              <AdminMenu />
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              textAlign={{ xs: "center", md: "left" }}
            >
              All Products
            </Typography>

            <Grid container spacing={3}>
              {product.map((p) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
                  <Link
                    to={`/dashboard/admin/products/${p?.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        boxShadow: 2,
                        transition: "0.3s",
                        "&:hover": { boxShadow: 6, transform: "translateY(-3px)" },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="180"
                        image={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`}
                        alt={p.name}
                        sx={{ objectFit: "contain", bgcolor: "#f1f5f9" }}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          gutterBottom
                          noWrap
                        >
                          {p.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {p.description?.slice(0, 40)}...
                        </Typography>
                        <Typography variant="subtitle1" color="primary" fontWeight="bold">
                          {p.price} Rs.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Products;
