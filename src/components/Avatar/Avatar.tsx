import React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Button, Link } from '@mui/material';
import NextLink from 'next/link';
import { useAuth } from '@/contexts/AuthContext';



export default function Avatar({ size = 35 }: { size?: number }) {
  const { user, loading, logout } = useAuth();

  const getInitials = (name?: string) =>
    name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : '?';
  
  if (loading) 
    return (
      <MuiAvatar 
        sx={{ 
          width: size, 
          height: size,
          bgcolor: 'grey.400',
        }} 
      />
    );

  if (!user) {
    return (
      <Link href="/login" component={NextLink} style={{ textDecoration: 'none' }}>
        <Tooltip title="Please log in">
          <MuiAvatar
            sx={{
              width: size,
              height: size,
              bgcolor: 'grey.400',
              fontWeight: 700,
              fontSize: size * 0.45,
            }}
          >
            {}
          </MuiAvatar>
        </Tooltip>
      </Link>
    );
  }

  return (
    <Link href="/" component={NextLink} onClick={() => logout()} style={{ textDecoration: 'none' }}>
      <Tooltip title="Log out">
        <MuiAvatar
          alt={user?.name || "Guest"}
          sx={{
            width: size,
            height: size,
            bgcolor: 'grey.400',
            fontWeight: 700,
            fontSize: size * 0.45,
          }}
        >
          {getInitials(user?.name)}
        </MuiAvatar>
      </Tooltip>
    </Link>
  );
}