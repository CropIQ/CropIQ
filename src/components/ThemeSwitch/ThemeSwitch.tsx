"use client";
import React from 'react';
import { useColorScheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ThemeSwitch() {
  const { mode, setMode } = useColorScheme();

  // if (mode !== 'light' && mode !== 'dark') return null;

  return (
    <IconButton 
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} 
      color="inherit"
    >
      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
}