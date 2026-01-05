import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

import { login as loginApi } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      const data = await loginApi({ email, password });

      // Save token and user to auth context
      login(data);

      navigate("/"); // Redirect home
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        marginTop: "100px" 
      }}
    >
      <Paper 
        elevation={4} 
        sx={{ 
          padding: "40px", 
          width: "400px", 
          background: "#1c1c1c", 
          color: "white",
          borderRadius: "10px"
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ textAlign: "center", marginBottom: "20px" }}
        >
          Login
        </Typography>

        {error && (
          <Typography color="red" sx={{ marginBottom: "10px" }}>
            {error}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="filled"
          sx={{ marginBottom: "20px", background: "white", borderRadius: "5px" }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="filled"
          sx={{ marginBottom: "20px", background: "white", borderRadius: "5px" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ marginBottom: "15px" }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography textAlign="center">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "skyblue" }}>
            Register here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
