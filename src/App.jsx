import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "@/style/theme-provider";
import Layout from "@/layout/layout";
import { Spinner } from "@/components/ui/spinner";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const History = lazy(() => import("@/pages/History"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
              <Spinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="history" element={<History />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
