import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "./CategoryForm";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const addCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/category/add-category`,
                { name }
            );
            if (res.data.success) {
                toast.success(`${name} created successfully`);
                setName("");
                getAllCategories();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Oops! Something went wrong");
        }
    };

    const getAllCategories = async () => {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API}/api/v1/category/category`
        );
        if (data?.success) {
            setCategories(data.category);
        }
    };

    useEffect(() => {
        getAllCategories();
        // eslint-disable-next-line
    }, []);

    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data?.success) {
                toast.success(`${selected.name} updated to ${updatedName}`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const deleteCategory = async (id) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
            );
            if (data?.success) {
                toast.success(data?.message);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <AdminMenu />
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="h5" gutterBottom>
                                Add Category
                            </Typography>

                            <Box
                                component="form"
                                onSubmit={addCategory}
                                sx={{ display: "flex", gap: 2, mb: 3 }}
                            >
                                <TextField
                                    label="Category Name"
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Add
                                </Button>
                            </Box>

                            <Paper sx={{ width: "100%", overflowX: "auto" }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: "grey.200" }}>
                                        <TableRow>
                                            <TableCell>Category</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {categories.map((c) => (
                                            <TableRow key={c._id}>
                                                <TableCell>{c.name}</TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        variant="outlined"
                                                        color="warning"
                                                        sx={{ mr: 1 }}
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(c.name);
                                                            setSelected(c);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => deleteCategory(c._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Update Category Dialog */}
            <Dialog open={visible} onClose={() => setVisible(false)} fullWidth>
                <DialogTitle>Update Category</DialogTitle>
                <DialogContent>
                    <CategoryForm
                        value={updatedName}
                        setValue={setUpdatedName}
                        handleSubmit={updateCategory}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVisible(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default AddCategory;
