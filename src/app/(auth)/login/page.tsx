"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/validator";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, error, setError, success, setSuccess, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    await login(email, password);
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSwitchToRegister = () => {
    router.push("/register");
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 400, margin: "auto", mt: 8, p: 4 }}>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          placeholder="user@email.com"
          error={!!emailError}
          helperText={emailError ? emailError : ""}
          required
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          placeholder="Abcc1234!"
          required
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" sx={{ mt: 1 }}>
            {success}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          Login
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Link
          component="button"
          onClick={handleForgotPassword}
          underline="hover"
          variant="body2"
        >
          Forgot password?
        </Link>
        <Link
          component="button"
          onClick={handleSwitchToRegister}
          underline="hover"
          variant="body2"
        >
          Don't have an account? Register
        </Link>
      </Box>
    </Paper>
  );
}