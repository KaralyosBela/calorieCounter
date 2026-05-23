import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { supabase } from "../database/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    if (mode === "signup") {
      console.log("email:", email);
      console.log("email length:", email.length);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) setError(error.message);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5">
          {mode === "login" ? "Login" : "Sign up"}
        </Typography>

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleAuth}
          disabled={loading}
        >
          {mode === "login" ? "Login" : "Create account"}
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "No account? Sign up"
            : "Already have account? Login"}
        </Button>
      </Paper>
    </Box>
  );
}
