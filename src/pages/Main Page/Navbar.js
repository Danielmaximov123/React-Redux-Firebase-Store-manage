import {  useNavigate } from "react-router-dom";
import { AppBar,  Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  

  return (
    <div>
          <AppBar position="static">
          <Container maxWidth="xl">
          <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{cursor : "pointer"}}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            onClick={()=> navigate("/")}
          >
            E-commerce
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large"  aria-label="account of current user" aria-controls="menu-appbar"  aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon/>
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left'}}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            </Menu>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography onClick={()=> navigate("/customers")} textAlign="center">Customers</Typography>
                  <Typography onClick={()=> navigate("/products")} textAlign="center">Products</Typography>
                  <Typography onClick={()=> navigate("/purchases")} textAlign="center">Purchases</Typography>
                </MenuItem>

            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button onClick={()=> navigate("/customers")} sx={{ my: 2, color: 'white', display: 'block' }}>Customers</Button>
              <Button onClick={()=> navigate("/products")} sx={{ my: 2, color: 'white', display: 'block' }}>Products</Button>
              <Button onClick={()=> navigate("/purchases")} sx={{ my: 2, color: 'white', display: 'block' }}>Purchases</Button>

          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  )
}

export default Navbar