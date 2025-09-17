import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "./UserMenu";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-profile`,
        { name, email, phone, address, password }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating profile");
    }
  };

  return (
    <Layout title="Ecommerce App - My Account">
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {/* User Menu */}
          <Grid item xs={12} md={2}>
            <UserMenu />
          </Grid>

          {/* Profile Form */}
          <Grid item xs={12} md={10}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                maxWidth: 600,
                margin: "0 auto",
                backgroundColor: "#fefefe",
              }}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  py: 1,
                  mb: 3,
                  textTransform: "uppercase",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                My Profile
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Phone"
                  variant="outlined"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  multiline
                  minRows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default MyProfile;
