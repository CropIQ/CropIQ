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
import { validateEmail, validatePassword } from "@/utils/validator";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register, error, setError, success, setSuccess, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);
    setSuccess(null);

    if (!name || !email || !password || !repeatPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    
    await register(name, email, password);
  };

  const handleSwitchToLogin = () => {
    router.push("/login");
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 400, margin: "auto", mt: 8, p: 4 }}>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          autoComplete="text"
          required
        />
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
          helperText={emailError}
          required
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          autoComplete="new-password"
          error={!!passwordError}
          helperText={passwordError}
          required
        />
        <TextField
          label="Repeat Password"
          fullWidth
          margin="normal"
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
          type="password"
          autoComplete="new-password"
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
          Register
        </Button>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Link
          component="button"
          onClick={handleSwitchToLogin}
          underline="hover"
          variant="body2"
        >
          Already have an account? Login
        </Link>
      </Box>
    </Paper>
  );
}