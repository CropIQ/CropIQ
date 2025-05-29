"use client";
import { withAuth } from "@/contexts/AuthContext";
import { use, useEffect, useState } from "react";
import { Farm } from "../page";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

function FarmsIdPage({
    params,
}: {
    params: Promise<{ id: number }>
}) {
  const { id } = use(params);
  const router = useRouter();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDeleteFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_HOST}/farms/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete farm");
      }
      const data = await response.json();
      setFarm(null);
      setSuccess("Farm deleted successfully!");
      setTimeout(() => {
        router.push("/farms");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    const fetchFarm = async () => {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      setLoading(true);
      setError(null);
      try {
          const response = await fetch(`${API_HOST}/farms/${id}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
              },
          });
          if (!response.ok) {
              throw new Error("Failed to fetch farm details");
          }
          const data = await response.json();
          setFarm(data.farm || null);
      } catch (err) {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
          setLoading(false);
      }
      };
      fetchFarm();
    }, []);


    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Farm Details
            </Typography>
            { loading && <Typography variant="body1">Loading...</Typography> }
            { error && <Typography variant="body1" color="error">Error: {error}</Typography> }
            { success && <Typography variant="body1" color="success">{success}</Typography> }
            { !loading && !error && farm ? (
              <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'normal' }}>
                <Box sx={{ display: 'flex', flexDirection: {xs: 'column'} }}>
                  <Box>
                    <Typography variant="h5">{farm.name}</Typography>
                    <Typography variant="body1">ID: {farm.id}</Typography>
                  </Box>
                  <Button variant="contained" onClick={() => router.push(`/new-task?farm-id=${farm.id}`)} sx={{ marginTop: 2 }}>
                    Create New Task
                  </Button>
                </Box>
                <Button variant="contained" onClick={handleDeleteFarm} sx={{ marginTop: 2, backgroundColor: 'error.light' }}>
                  Delete Farm
                </Button>
              </Box>
            ) : null }
        </div>
    );
}

export default withAuth(FarmsIdPage);