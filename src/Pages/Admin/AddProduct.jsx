import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardMedia,
} from "@mui/material";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantiity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");

  // Fetch categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching categories");
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
      productData.append("photo", photo);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/new-product`,
        productData
      );

      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong while creating new product");
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <AdminMenu />
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={9}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Add Product
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: "600px",
              }}
            >
              {/* Category */}
              <FormControl fullWidth>
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={category}
                  label="Select Category"
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
              <Button
                variant="outlined"
                component="label"
                color="primary"
              >
                Upload Product Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </Button>

              {/* Preview */}
              {photo && (
                <Card sx={{ maxWidth: 300 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={URL.createObjectURL(photo)}
                    alt="Product Preview"
                  />
                </Card>
              )}

              {/* Inputs */}
              <TextField
                label="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Price (₹)"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantiity(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiline
                rows={3}
                fullWidth
              />

              {/* Shipping */}
              <FormControl fullWidth>
                <InputLabel>Shipping</InputLabel>
                <Select
                  value={shipping}
                  label="Shipping"
                  onChange={(e) => setShipping(e.target.value)}
                >
                  <MenuItem value="0">No</MenuItem>
                  <MenuItem value="1">Yes</MenuItem>
                </Select>
              </FormControl>

              {/* Submit */}
              <Button
                variant="contained"
                type="submit"
                color="primary"
                size="large"
              >
                Upload Product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default AddProduct;
