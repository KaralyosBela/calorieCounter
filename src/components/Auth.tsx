import { useState } from "react";
import { supabase } from "../database/supabase";
import {
  Button,
  Card,
  ErrorMessage,
  Form,
  Input,
  Spinner,
  Typography,
} from "@heroui/react";

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
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <Card.Header>
          <Typography weight="bold">
            {mode === "login" ? "Login" : "Sign up"}
          </Typography>
          <Typography className="text-gray-500">
            {mode === "login"
              ? "Enter your credentials to log in"
              : "Create a new account"}
          </Typography>
        </Card.Header>

        <Form
          onSubmit={() => {
            handleAuth();
          }}
        >
          <Card.Content className="flex flex-col gap-4 mb-4">
            <Input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Card.Content>

          <Card.Footer className="flex flex-col gap-3">
            <Button isPending={loading} className="w-full" type="submit">
              {({ isPending }) => (
                <>
                  {isPending ? <Spinner color="current" size="sm" /> : null}
                  {mode === "login" ? "Login" : "Create account"}
                </>
              )}
            </Button>
            <Button
              variant="primary"
              className="w-full"
              onPress={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login"
                ? "No account? Sign up"
                : "Already have an account? Login"}
            </Button>
            {error && (
              <ErrorMessage className="text-danger">{error}</ErrorMessage>
            )}
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}
