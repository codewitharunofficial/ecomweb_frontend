import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DeleteWarningFrom from "../Forms/DeleteWarningFrom";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantiity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const [slug, setSlug] = useState("");
  const [visible, setVisible] = useState(false);

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-a-product/${params.slug}`
      );
      if (data?.success) {
        setName(data.product.name);
        setCategory(data.product.category);
        setPrice(data.product.price);
        setQuantiity(data.product.quantity);
        setDescription(data.product.description);
        setShipping(data?.product?.shipping);
        setSlug(data?.product?.slug);
        setId(data?.product?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // get categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Something Went Wrong While Fetching Categories");
    }
  };

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/products/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong While Updating the Product");
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`
      );

      if (data?.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Grid container spacing={3} p={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <AdminMenu />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Update Product
              </Typography>

              {/* Category Select */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select a Category</InputLabel>
                <Select
                  value={category}
                  label="Select a Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Upload Photo */}
              <Box sx={{ mb: 2 }}>
                <Button variant="outlined" component="label">
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </Button>
              </Box>

              {/* Preview Photo */}
              <Box sx={{ mb: 2 }}>
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="preview"
                    height="200px"
                    style={{ borderRadius: 8 }}
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${id}`}
                    alt="product"
                    height="200px"
                    style={{ borderRadius: 8 }}
                  />
                )}
              </Box>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantiity(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel>Shipping</InputLabel>
                  <Select
                    value={shipping ? "1" : "0"}
                    onChange={(e) => setShipping(e.target.value)}
                  >
                    <MenuItem value="0">No</MenuItem>
                    <MenuItem value="1">Yes</MenuItem>
                  </Select>
                </FormControl>

                <Box mt={3} display="flex" gap={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    onClick={handleSubmit}
                  >
                    Update Product
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setVisible(true)}
                  >
                    Delete Product
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={visible} onClose={() => setVisible(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DeleteWarningFrom handleDelete={handleDelete} slug={slug} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVisible(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default UpdateProduct;
