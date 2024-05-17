import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/system";

const defaultTheme = createTheme();

export default function Register() {
  const { user } = useAuth();
  if (user !== undefined) {
    return <Navigate to="/" />;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const userData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await fetch(
        "https://notes-backend-production-b684.up.railway.app/api/user/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("User registered successfully:", responseData);

      toast.success("User registered successfully!");
      setFormData({ username: "", password: "" });
    } catch (error: any) {
      console.error("There was an error registering the user:", error.message);
      toast.error("Failed to register user. Please try again.");
    }
  };

  const handleInputChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{
              margin: 1,
              backgroundColor: defaultTheme.palette.secondary.main,
            }}
          ></Avatar>
          <Typography component="h1" variant="h5" marginTop={2}>
            Register Account
          </Typography>
          <form onSubmit={handleSubmit} noValidate style={{ marginTop: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Typography
              variant="body2"
              style={{ marginTop: 16, marginBottom: 16 }}
            >
              By clicking <strong>Register</strong>, you will register and then
              you can login and use the app.
            </Typography>
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              component="button"
              style={{
                marginTop: 3,
                marginBottom: 2,
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
            <Typography variant="body2" textAlign="center" marginTop={2}>
              Already have an account?{" "}
              <Link href="/login" variant="body2" underline="none">
                <b>Login</b>
              </Link>
            </Typography>
          </form>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
