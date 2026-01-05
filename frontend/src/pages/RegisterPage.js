import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

import { register as registerApi, saveToken } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setError("");

      const data = await registerApi({ name, email, password });

      // Automatically login after successful registration
      login(data);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
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
          Register
        </Typography>

        {error && (
          <Typography color="red" sx={{ marginBottom: "10px" }}>
            {error}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Name"
          variant="filled"
          sx={{ marginBottom: "20px", background: "white", borderRadius: "5px" }}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography textAlign="center">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "skyblue" }}>
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
