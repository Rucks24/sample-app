import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import MenuItem from '@mui/material/MenuItem';
import SaveOptionField from './SaveOptionField';
import VersionListOptionField from './VersionListOptionField';

const options = [
    {
        name: 'Versions'
    },
    {
        name: 'Save'
    }
];

// const versions = [
//     {
//         name: 'version 1'
//     },
//     {
//         name: 'version 2'
//     },
//     {
//         name: 'version 3'
//     }
// ]

const TabField = ({saveCurrentVersionOfGraph, downloadGraph, loadVersionOfGraph, graphs}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    console.log('EVEnt -> ', event.currentTarget)    
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (key) => {
    console.log('EVEnt Clse -> ', key)    
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoGraphIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Graph
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
              {options.map((page) => (
                <MenuItem key={page.name}>
                    {page.name === 'Save' && 
                        <SaveOptionField
                            handleCloseNavMenu={handleCloseNavMenu}
                            downloadGraph={downloadGraph}
                            saveCurrentVersionOfGraph={saveCurrentVersionOfGraph}
                        />
                    }
                    {page.name === 'Versions' &&
                        <VersionListOptionField
                            handleCloseNavMenu={handleCloseNavMenu}
                            loadVersionOfGraph={loadVersionOfGraph}
                            versions={graphs}
                        />
                    }
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AutoGraphIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Graph
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {options.map((page) => (
              <>
                {page.name === 'Save' && 
                    <SaveOptionField
                        handleCloseNavMenu={handleCloseNavMenu}
                        downloadGraph={downloadGraph}
                        saveCurrentVersionOfGraph={saveCurrentVersionOfGraph}
                    />
                }
                {page.name === 'Versions' &&
                    <VersionListOptionField
                        handleCloseNavMenu={handleCloseNavMenu}
                        loadVersionOfGraph={loadVersionOfGraph}
                        versions={graphs}
                    />
                }
              </>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TabField;
