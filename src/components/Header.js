import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '../ThemeContext';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';

export default function ButtonAppBar() {

    const { toggleTheme,theme  } = useTheme();

   
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
             
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'sans-serif', fontWeight :  'bold' }} >
            Bridge
          </Typography>
          {theme.palette.mode === 'light' ? (
            <IconButton color="inherit">
              <WbSunnyIcon onClick={toggleTheme} className='text-warning' style={{"color" : "yellow"}} />
            </IconButton>
          ) : (
            <IconButton color="inherit">
              <BedtimeIcon onClick={toggleTheme}  />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
