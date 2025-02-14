import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const {
    tab,
    formData,
    errors,
    setShowPassword,
    showPassword,
    handleSubmit,
    handleTabChange,
    handleChange,
  } = useAuth();
  return (
    <Container maxWidth="sm">
      <Card
        style={{ marginTop: "120px", padding: "20px", textAlign: "center" }}
      >
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {tab === 0 ? "Login to Your Account" : "Create an Account"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px", backgroundColor: "black" }}
            >
              {tab === 0 ? "Login" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Auth;
