import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";

const CategoryForm = ({ value, setValue, handleSubmit }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 4,
        maxWidth: 450,
        mx: "auto",
        mt: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
          Edit Category
        </Typography>

        <Divider sx={{ mb: 2 }} />

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
            label="Category Name"
            placeholder="Enter new name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            margin="normal"
            variant="outlined"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: "bold",
              borderRadius: 3,
              textTransform: "none",
            }}
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
