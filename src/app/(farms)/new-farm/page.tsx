"use client";
import { withAuth } from "@/contexts/AuthContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

function NewFarmPage() {
  const router = useRouter();

  function handleCreateFarm() {
  }

  return (
    <Box sx={{ p: 2 }}>
      <h1>Create New Farm</h1>
    </Box>
  );
}

export default withAuth(NewFarmPage);