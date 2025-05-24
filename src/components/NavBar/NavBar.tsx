"use client";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Overview', href: '/' },
  { label: 'Farms', href: '/farms' },
  { label: 'Tasks', href: '/tasks' },
  { label: 'Orders', href: '/orders' },
  { label: 'Workers', href: '/workers' },
];

export default function NavBar() {
  const pathname = usePathname();
  const current = navLinks.findIndex(link => link.href === pathname);

  return (
    <Tabs 
    value={current === -1 ? false : current} 
    variant="scrollable" 
    scrollButtons="auto"
    textColor='inherit'
    sx={{
      ".MuiTabs-indicator": { backgroundColor: "header.navBarColor" },
    }}>
      {navLinks.map((link, idx) => (
        <Tab
          key={idx}
          label={link.label}
          component={Link}
          href={link.href}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            minWidth: 120,
          }}
        />
      ))}
    </Tabs>
  );
}