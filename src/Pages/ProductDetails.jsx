import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductDetailsComponent from "../Components/ProductDetailComponent";
import Loader from "../Components/Layout/Loader";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";

const ProductDetails = () => {
  // const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  // eslint-disable-next-line 
  const [slug, setSlug] = useState("");
  // const [shipping, setShipping] = useState();
  const params = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [product, setProduct] = useState();

  const getTheProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-a-product/${params.slug}`
      );

      if (data?.success) {
        setName(data?.product?.name);
        setPrice(data?.product?.price);
        setSlug(data?.product?.slug);
        setDescription(data?.product?.description);
        setId(data?.product?._id);
        getSimilarProducts(data?.product?._id, data?.product?.category);
        setProduct(data?.product);
        console.log(data?.product?.category);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheProduct();
    //eslint-disable-next-line
  }, []);

  //fetching similar products

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/related-products/${pid}/${cid}`
      );
      console.log(data);
      setRelatedProducts(data?.relatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //    getSimilarProducts();
  //    //eslint-disable-next-line
  // }, []);

  return (
    <Layout>
      <div className="row wrapper" style={{ minHeight: '90vh' }} >
        {
          product ? (
            <ProductDetailsComponent name={name} price={price} description={description} rating={product?.rating} image={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${id}`} />
          ) : (
            <Loader />
          )
        }
      </div>
      <hr style={{ borderColor: '#000', borderWidth: '2px', width: '100%' }} />

      <Box sx={{ my: 4, px: { xs: 2, sm: 4 } }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Similar Products
        </Typography>
        <Divider sx={{ mb: 3, maxWidth: 200, mx: "auto" }} />

        <Grid container spacing={3} justifyContent="center">
          {!relatedProducts || relatedProducts.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No Similar Products Found
            </Typography>
          ) : (
            relatedProducts.map((p) => (
              <Grid item xs={12} sm={6} md={3} key={p._id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onClick={() => navigate(`/products/${p.slug}`)}
                >
                  {/* Product Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`}
                    alt={p.name}
                    sx={{ objectFit: "cover", borderBottom: "1px solid #eee" }}
                  />

                  {/* Product Info */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                      noWrap
                    >
                      {p.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      gutterBottom
                    >
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.9rem" }}
                    >
                      {p.description.slice(0, 50)}...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default ProductDetails;
