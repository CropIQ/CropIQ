"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import NavBar from '@/components/NavBar/NavBar';
import Avatar from '@/components/Avatar/Avatar';
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" elevation={0} enableColorOnDark suppressHydrationWarning sx={{ bgcolor: 'header.main', color: 'header.contrastText', borderBottom: '2px solid', borderColor: 'divider' }}>
        <Container maxWidth={false}>
          <Toolbar disableGutters sx={{ gap: 1 }}>
            <Link href="/" component={NextLink} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', gap: 1, flexGrow: 1 }}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={30}
                height={30}
              />
              <Typography variant="h6" sx={{ mr: 2, display: 'flex', fontFamily: 'Segoe UI Emoji', fontWeight: 900 }}>
                CropIQ
              </Typography>
            </Link>
            <Tooltip title="Create new...">
              <IconButton 
                size='small'
                color="inherit" 
                onClick={handleOpenMenu}
                sx={{ 
                  border: '1px solid #63fc05',
                  borderColor: 'header.borderColor',
                  borderRadius: 3
                }}
              >
                <AddSharpIcon />
                <ArrowDropDownSharpIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              sx={{ mt: '45px' }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleCloseMenu}>
                <Link href="/new-farm" component={NextLink} sx={{ textDecoration: 'none', color: 'inherit' }}>
                  New Farm
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <Link href="/new-animal" component={NextLink} sx={{ textDecoration: 'none', color: 'inherit' }}>
                  New Animal
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <Link href="/new-order" component={NextLink} sx={{ textDecoration: 'none', color: 'inherit' }}>
                  New Order
                </Link>
              </MenuItem>
            </Menu>
            <ThemeSwitch />
            <Avatar />
          </Toolbar>
          <Toolbar disableGutters variant='dense'>
            <NavBar />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}