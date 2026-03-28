import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Hub        = lazy(() => import("@/pages/Hub"));
const Systems    = lazy(() => import("@/pages/Systems"));
const Art        = lazy(() => import("@/pages/Art"));
const Psychology = lazy(() => import("@/pages/Psychology"));
const Branding   = lazy(() => import("@/pages/Branding"));
const Social     = lazy(() => import("@/pages/Social"));
const NotFound   = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Hub} />
        <Route path="/design" component={Systems} />
        <Route path="/art" component={Art} />
        <Route path="/psychology" component={Psychology} />
        <Route path="/branding" component={Branding} />
        <Route path="/social" component={Social} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
