import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [backendUrl, setBackendUrl] = useState('localhost:8000');
  const [xapiKey, setXapiKey] = useState('GHZpE7w7SOeTR7mSEv8Hyg4fQjAwRhPv');
  // const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect ran")
    const storedBackendUrl = localStorage.getItem('backend_url');
    const storedXapiKey = localStorage.getItem('x_api_key');
    if (storedBackendUrl && storedXapiKey) {
      handleSubmit(storedBackendUrl, storedXapiKey)
    }
  }, []);

  function handleSubmit(backendUrl: string, xapiKey: string) {
    console.log(backendUrl, xapiKey);
    localStorage.setItem('backend_url', backendUrl)
    localStorage.setItem('x_api_key', xapiKey)
    fetch(`http://${backendUrl}/login`, {
      method: 'GET',
      headers: {
        'x-api-key': xapiKey
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Connection successful:", data);
        if (data['status'] === "LOGGED_IN") {
          navigate('/dashboard')
        } else {
          localStorage.removeItem('backend_url')
          localStorage.removeItem('x_api_key')
          window.location.href = data['url']
        }

      })
      .catch(error => {
        console.error("Connection failed:", error);
      });
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <img src="/images/gameleet.png"></img>
                </a>
                <h1 className="text-xl font-bold">Get Started</h1>
                <div className="text-center text-sm">
                  Connect to your self-hosted GamLeet Backend
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label>Backend URL</Label>
                  <Input
                    id="backend-url"
                    type="text"
                    placeholder="api.domain.com"
                    value={backendUrl}
                    onChange={e => setBackendUrl(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label>X-API Key</Label>
                  <Input
                    id="x-api-key"
                    type="password"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    value={xapiKey}
                    onChange={e => setXapiKey(e.target.value)}
                    required
                  />
                </div>
                <Button type="button" className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer flex items-center justify-center gap-2" onClick={() => handleSubmit(backendUrl, xapiKey)}>
                  <img src="/images/zerodha.png" alt="Zerodha Logo" className="h-5 w-5" />
                  Sign In With Zerodha
                </Button>
              </div>
            </div>
          </form>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By signing in, you agree that you are solely responsible for any losses incurred.
          </div>
        </div>
      </div>
    </div>
  )
}
