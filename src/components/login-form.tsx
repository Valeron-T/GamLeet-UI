import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { loginDev, loginWithGoogle } from "@/api/auth"
import { useAuth } from "@/contexts/AuthContext"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshAuth, isAuthenticated } = useAuth();

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleDevLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await loginDev(email);
      await refreshAuth();
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      await loginWithGoogle(credentialResponse.credential);
      await refreshAuth();
      navigate('/dashboard');
    } catch (error) {
      console.error("Google login failed", error);
      toast.error("Google Login failed.");
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <img src="/images/gameleet.png" alt="GamLeet" className="h-12 w-auto" />
            </a>
            <h1 className="text-xl font-bold">Welcome Back</h1>
            <div className="text-center text-sm text-muted-foreground">
              Login to your GamLeet account
            </div>
          </div>

          {googleClientId ? (
            <div className="flex flex-col gap-4">
              <GoogleOAuthProvider clientId={googleClientId}>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => toast.error("Google Login Failed")}
                    theme="filled_black"
                    shape="pill"
                    width="300"
                  />
                </div>
              </GoogleOAuthProvider>
              <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  SaaS Mode
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDevLogin} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Developer Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="dev@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Developer Login"}
              </Button>
              <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Development / Self-Hosted
                </span>
              </div>
            </form>
          )}

          <div className="text-muted-foreground text-center text-xs text-balance">
            By signing in, you agree that you are solely responsible for any losses incurred.
          </div>
        </div>
      </div>
    </div>
  )
}
