import React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import { useUserInfo } from '@/hooks/useUserInfo';



export default function Avatar({ size = 35 }: { size?: number }) {
  const { user, loading } = useUserInfo();

  const getInitials = (name?: string) =>
    name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : '?';
  
  if (loading) return <MuiAvatar sx={{ width: size, height: size }} />;

  return (
    <MuiAvatar
      src={user?.avatarUrl}
      alt={user?.name || "Guest"}
      sx={{
        width: size,
        height: size,
        bgcolor: user?.avatarUrl ? undefined : 'grey.400',
        fontWeight: 700,
        fontSize: size * 0.45,
      }}
    >
      {!user?.avatarUrl && getInitials(user?.name)}
    </MuiAvatar>
  );
}