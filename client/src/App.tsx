import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Hub from "@/pages/Hub";
import Systems from "@/pages/Systems";
import Art from "@/pages/Art";
import Psychology from "@/pages/Psychology";
import Branding from "@/pages/Branding";
import Social from "@/pages/Social";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Hub} />
      <Route path="/design" component={Systems} />
      <Route path="/art" component={Art} />
      <Route path="/psychology" component={Psychology} />
      <Route path="/branding" component={Branding} />
      <Route path="/social" component={Social} />
      <Route component={NotFound} />
    </Switch>
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
