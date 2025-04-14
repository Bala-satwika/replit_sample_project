import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout/layout";
import Dashboard from "@/pages/dashboard";
import Visualize from "@/pages/visualize";
import Datasets from "@/pages/datasets";
import Share from "@/pages/share";
import Settings from "@/pages/settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/visualize" component={Visualize} />
      <Route path="/datasets" component={Datasets} />
      <Route path="/share" component={Share} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </>
  );
}

export default App;
