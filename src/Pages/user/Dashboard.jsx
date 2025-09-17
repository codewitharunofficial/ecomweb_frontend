import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/auth";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { Person } from "@mui/icons-material";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb", p: 3 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
              <UserMenu />
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              {/* Profile Header */}
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "center", sm: "flex-start" }}
                justifyContent="space-between"
                mb={4}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  {auth?.user?.avatar ? (
                    <Avatar
                      src={auth.user.avatar}
                      alt={auth.user.name}
                      sx={{ width: 80, height: 80 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
                      <Person fontSize="large" />
                    </Avatar>
                  )}

                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {auth?.user?.name || "Admin User"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {auth?.user?.email || "No email provided"}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: { xs: 2, sm: 0 }, borderRadius: 3 }}
                >
                  Edit Profile
                </Button>
              </Box>

              {/* Profile Info */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 2, borderRadius: 2, bgcolor: "#f1f5f9" }}>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography fontWeight="500">
                      {auth?.user?.phone || "N/A"}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 2, borderRadius: 2, bgcolor: "#f1f5f9" }}>
                    <Typography variant="body2" color="text.secondary">
                      Answer
                    </Typography>
                    <Typography fontWeight="500">
                      {auth?.user?.answer || "N/A"}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card sx={{ p: 2, borderRadius: 2, bgcolor: "#f1f5f9" }}>
                    <Typography variant="body2" color="text.secondary">
                      Address
                    </Typography>
                    <Typography fontWeight="500">
                      {auth?.user?.address || "N/A"}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Dashboard;
