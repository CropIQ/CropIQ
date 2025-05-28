"use client";
import { withAuth } from "@/contexts/AuthContext";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { use, useEffect, useState } from "react";

type Farm = {
  id: string;
  name: string;
};

function FarmsPage() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarms = async () => {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_HOST}/farms`);
        if (!response.ok) {
          throw new Error("Failed to fetch farms");
        }
        const data = await response.json();
        setFarms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchFarms();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{alignItems: 'center', display: 'flex'}}>
        Farms Page
      </Typography>
      <List>
        
      </List>
      
    </Box>
  );
}

export default withAuth(FarmsPage);