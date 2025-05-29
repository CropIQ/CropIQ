"use client";
import { withAuth } from "@/contexts/AuthContext";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
];

function NewTaskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignedWorkerId, setAssignedWorkerId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [farmId, setFarmId] = useState(searchParams?.get('farm-id') || "");
  

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (!name.trim()) {
      setError("Task name cannot be empty.");
      setLoading(false);
      return;
    }
    if (!description.trim()) {
      setError("Description cannot be empty.");
      setLoading(false);
      return;
    }
    if (!assignedWorkerId.trim()) {
      setError("Assigned worker Id cannot be empty.");
      setLoading(false);
      return;
    }
    if (!dueDate.trim()) {
      setError("Due date cannot be empty.");
      setLoading(false);
      return;
    }
    if (!priority.trim()) {
      setError("Priority cannot be empty.");
      setLoading(false);
      return;
    }
    if (!farmId.trim()) {
      setError("Farm Id cannot be empty.");
      setLoading(false);
      return;
    }
    try {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      const response = await fetch(`${API_HOST}/farmer/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ name, description, assignedWorkerId, dueDate, priority, farmId }),
      })
      if (!response.ok) {
        throw new Error("Failed to create task. Please try again.");
      }
      await response.json();
      setSuccess("Task created successfully! Redirecting to tasks page...");
      setTimeout(() => {
        router.push("/tasks");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        New Task Page
      </Typography>
      <Box component="form" onSubmit={handleCreateTask} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField 
          label="Task Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
          variant="outlined"
          required
        />
        <TextField 
          label="Task Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task name"
          variant="outlined"
          required
        />
        <TextField 
          label="Assigned worker Id"
          fullWidth
          type="number"
          margin="normal"
          value={assignedWorkerId}
          onChange={(e) => setAssignedWorkerId(e.target.value)}
          placeholder="Assigned worker Id"
          variant="outlined"
          required
        />
        <TextField 
          label=""
          type="date"
          fullWidth
          margin="normal"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          variant="outlined"
          required
        />
        <TextField 
          label="Priority"
          select
          fullWidth
          margin="normal"
          defaultValue={"low"}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          placeholder="Select priority"
          variant="outlined"
          required
        >
          {priorities.map((option) => (
            <MenuItem  key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}    
        </TextField>
        <TextField 
          label="Farm Id"
          fullWidth
          margin="normal"
          type="number"
          value={farmId}
          onChange={(e) => setFarmId(e.target.value)}
          placeholder="Select Farm Id"
          variant="outlined"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <Button type="submit" variant="contained" color="primary" onClick={handleCreateTask}>
          {loading ? "Creating..." : "Create Task"}
        </Button>
      </Box>
    </Box>
  );
}

export default withAuth(NewTaskPage);