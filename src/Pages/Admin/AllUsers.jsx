import React from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../Components/Layout/Layout";
import { Grid, Paper, Typography, Box } from "@mui/material";

const AllUsers = () => {
    return (
        <Layout>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Grid container spacing={3}>
                    {/* Sidebar */}
                    <Grid item xs={12} md={3}>
                        <AdminMenu />
                    </Grid>

                    {/* Main content */}
                    <Grid item xs={12} md={9}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                textAlign: "center",
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                All Users
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Here you can view and manage all registered users.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default AllUsers;
