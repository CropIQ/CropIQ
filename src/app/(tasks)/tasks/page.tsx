"use client";
import { withAuth } from "@/contexts/AuthContext";
import { ListItemButton } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  name: string;
  description: string;
  dueDate: string;
};

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_HOST}/worker/assignedTasks`, {
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
        setTasks(data.tasks || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{alignItems: 'center', display: 'flex'}}>
        Tasks Page
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: 2, marginLeft: 2 }}>
        {loading && <Typography>Loading tasks...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && tasks.map((task) => (
          // <ListItemButton>
          //   <ListItemText primary={} />
          // </ListItemButton>
          <Box key={task.id} sx={{ padding: 1, borderBottom: '1px solid #ccc' }}>
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2">{task.description}</Typography>
            <Typography variant="caption" color="textSecondary">Due: {new Date(task.dueDate).toLocaleDateString()}</Typography>
          </Box>
        ))}
        
      </List>
      
    </Box>
  );
}

export default withAuth(Tasks);