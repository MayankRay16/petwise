import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Redirect({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation(to, { replace: true });
  }, [to, setLocation]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quiz" component={Home} />
      <Route path="/breeds/:animal" component={Home} />
      <Route path="/compatibility" component={Home} />
      <Route path="/care" component={Home} />
      <Route path="/policies/:policy" component={Home} />
      <Route path="/care-library" component={() => <Redirect to="/care" />} />
      <Route path="/multi-pet-guide" component={() => <Redirect to="/compatibility" />} />
      <Route path="/find-your-fit" component={() => <Redirect to="/quiz" />} />
      <Route path="/sources" component={() => <Redirect to="/care" />} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
