import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";

const CategoryForm = ({ value, setValue, handleSubmit }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, p: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Edit Category
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            required
            id="inputCategory"
            label="New Name"
            placeholder="Category Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: 2 }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
