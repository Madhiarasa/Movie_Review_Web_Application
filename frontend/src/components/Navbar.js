import { AppBar, Toolbar, Typography, Button, Box, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query.length > 0) {
        navigate(`/search?query=${query}`);
      }
    }
  };

  return (
    <AppBar position="static" sx={{ background: "#1c1c1c" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{ 
            textDecoration: "none",
            color: "white",
            fontWeight: "bold"
          }}
        >
          MovieBoxd
        </Typography>

        {/* Search bar */}
        <Box sx={{ width: "40%" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search movies..."
            onKeyDown={handleSearch}
            sx={{
              background: "white",
              borderRadius: "5px",
            }}
          />
        </Box>

        {/* Right side - User Options */}
        <Box>
          {/* If NOT logged in */}
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          ) : (
            /* If logged in */
            <>
              <Button 
                color="inherit"
                component={Link}
                to={`/user/${user._id}`}
              >
                {user.name}
              </Button>

              <Button 
                color="inherit"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
