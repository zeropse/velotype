import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/style/theme-provider";
import Layout from "@/layout/layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import History from "@/pages/History";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="history" element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
