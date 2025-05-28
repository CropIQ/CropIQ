import { User } from '@/contexts/AuthContext';
import Typography from '@mui/material/Typography';

export default function HelloUser({
  user,
}: {
  user: User | null;
}) {
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 4, mt: 3 }}>
      Hello, {user?.name ?? "Guest"}!
    </Typography>
  );
}