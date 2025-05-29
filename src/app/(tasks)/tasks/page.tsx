"use client";
import { withAuth } from "@/contexts/AuthContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  name: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
};

function Tasks() {
  const router = useRouter();
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
          throw new Error("Failed to fetch tasks");
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
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" gutterBottom sx={{alignItems: 'center', display: 'flex'}}>
          Tasks Page
        </Typography>
        <Button variant="contained" color="primary" onClick={() => router.push('/new-task')}>
          Create New Task
        </Button>
      </Box>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: 2, marginLeft: 2 }}>
        {loading && <Typography>Loading tasks...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && tasks.map((task) => (
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