"use client";
import { withAuth } from "@/contexts/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

function NewFarmPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [name, setName] = useState("");
  

  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (!name.trim()) {
      setError("Farm name cannot be empty.");
      setLoading(false);
      return;
    }
    try {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      const response = await fetch(`${API_HOST}/farms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ name }),
      })
      if (!response.ok) {
        throw new Error("Failed to create farm. Please try again.");
      }
      const data = await response.json();
      setSuccess("Farm created successfully! Redirecting to farms page...");
      setTimeout(() => {
        router.push("/farms");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
      setName("");
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        New Farm Page
      </Typography>
      <Box component="form" onSubmit={handleCreateFarm} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField 
          label="Farm Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter farm name"
          variant="outlined"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <Button type="submit" variant="contained" color="primary" onClick={handleCreateFarm}>
          {loading ? "Creating..." : "Create Farm"}
        </Button>
      </Box>
    </Box>
  );
}

export default withAuth(NewFarmPage);