import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Menu from '@mui/icons-material/Menu';
import React, { FC, Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';
import MuiDrawer from '@mui/material/Drawer';
import Login from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import Home from '@mui/icons-material/Home';
import Abc from '@mui/icons-material/Abc';
import MuiListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import  Medication from '@mui/icons-material/Mediation';
import PersonIcon from '@mui/icons-material/Person';
//import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

import { useProfileContext } from 'src/providers/profile';





const Brand = styled('div')(({ theme }) => ({
  margin: '0 auto 0 0',
  [theme.breakpoints.up('xs')]: {
    img: {
      width: '60px',
      height: '20px',
    }
  },
  [theme.breakpoints.up('sm')]: {
    img: {
      width: '90px',
      height: '30px',
    }
  }
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 200,
    boxSizing: 'border-box',
    background: theme.palette.primary.main,
  },
  [theme.breakpoints.up('xs')]: {
    display: 'block' 
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}));

const DrawerButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}));

const Nav = styled(Box)(({ theme }) => ({
  button: {
    alignItems: 'flex-start'
  },
  [theme.breakpoints.up('xs')]: {
    display: 'none'
  },
  [theme.breakpoints.up('sm')]: {
    display: 'block'
  }
}));

const ListItem = styled(MuiListItem)(({ theme }) => ({
  '.MuiListItemIcon-root': {
    minWidth: '0',
    marginRight: theme.spacing(0.5),
    color: theme.palette.text.primary,
  }
}));

const HeaderComponent: FC<unknown> = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { userDetails, signOut } = useProfileContext();

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  }

  const drawerContent = (
    <Box onClick={handleDrawerToggle}>
      <List sx={{ color: "#FFFFFF" }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/home")}>
            <ListItemIcon>
              <Home sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/about")}>
            <ListItemIcon>
              <Abc sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>

        {/* <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/form")}>
            <ListItemIcon>
              <Home sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Form" />
          </ListItemButton>
        </ListItem> */}

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/symptoms")}>
            <ListItemIcon>
              <Abc sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Symptoms" />
          </ListItemButton>
        </ListItem>

        
       
        
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <Logout sx={{ color: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const navContent = (
    <Fragment>
      <DrawerButton
          edge="start"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
      >
          <Menu />
      </DrawerButton>
      <Nav>
        <Button onClick={() => navigate("/home")}>
          <Home />
          Home
        </Button>
        <Button onClick={() => navigate("/about")}>
          <Abc />
          About
        </Button>
        {/* <Button onClick={() => navigate("/form")}>
          <Abc />
          Form
        </Button> */}
        <Button onClick={() => navigate("/symptoms")}>
          <Medication />
           Symptoms
        </Button>
        
        <Button onClick={handleSignOut}>
          <Logout />
          Sign Out
        </Button>
      </Nav>
    </Fragment>
  );

  const adminNavContent = (
    <Fragment>
      <DrawerButton
          edge="start"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
      >
          <Menu />
      </DrawerButton>
      <Nav>
        <Button onClick={() => navigate("/users")}>
          <PersonIcon />
          User
        </Button>
        <Button onClick={() => navigate("/modules")}>
          <Home />
          Module
        </Button>
        
        <Button onClick={handleSignOut}>
          <Logout />
          Sign Out
        </Button>
      </Nav>
    </Fragment>
  );
  return (
    <Fragment>
      <AppBar 
        component="nav"
        sx={{ background: 'transparent', position: 'relative' }}
      >
        <Toolbar>
          <Brand>
            <img src="/logo.svg" alt="logo" />
          </Brand>
          {userDetails && <p style={{color: '#000000'}}>Hi {userDetails.name}({userDetails.type})</p>}
          {userDetails?.type === 'Patient' && navContent }
          { userDetails?.type === 'Admin' && adminNavContent}
          {!userDetails &&
          
            <Button
              data-testid="btn-sign-in"
              onClick={() =>  navigate('/')}
              sx={{ alignItems: 'flex-start' }}
            >
              <Login />
              Sign In
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Box component="nav">
          <Drawer
              open={open}
              anchor='right'
              variant="temporary"
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
          >
              {drawerContent}
          </Drawer>
      </Box>
    </Fragment>
  );
};

export default HeaderComponent;