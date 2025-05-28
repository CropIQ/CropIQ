"use client";
import HelloUser from "@/components/HelloUser/HelloUser";
import { useAuth } from "@/contexts/AuthContext";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return (
            <Box sx={{ textAlign: "center", mt: 8 }}>
                <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                    Please log in to see your profile.
                </Typography>
                <Button onClick={() => router.push("/login")} variant="contained" color="primary" sx={{ mt: 4 }}>
                    Log in
                </Button>
            </Box>
        );
    }

    return (
        <>
            <HelloUser user={user} />
        </>
    );
}