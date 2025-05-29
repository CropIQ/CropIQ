"use client";
import { withAuth } from "@/contexts/AuthContext";
import { Button, Link } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export type Farm = {
  id: string;
  name: string;
};

function FarmsPage() {
  const router = useRouter();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarms = async () => {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_HOST}/farms`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch farms");
        }
        const data = await response.json();
        setFarms(data.farms || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchFarms();
  }, []);

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" gutterBottom sx={{alignItems: 'center', display: 'flex'}}>
          Farms Page
        </Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/new-farm')}>
          Create New Farm
        </Button>
      </Box>
      { loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : error ? (
        <Typography variant="body1" color="error">
          Error: {error}
        </Typography>
      ) : (
        <List sx={{ gap: 2 }}>
          {farms.map(farm => (
            <Box key={farm.id} sx={{ padding: 2, border: '1px solid #ccc', borderRadius: '4px'}}>
              <Link href={`/farms/${farm.id}`} component={NextLink} variant="body1" sx={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6">{farm.name}</Typography>
                <Typography variant="body2">ID: {farm.id}</Typography>
              </Link>
            </Box>
          ))}
        </List>
      )}
      
    </Box>
  );
}

export default withAuth(FarmsPage);