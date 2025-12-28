import { Outlet } from "react-router-dom";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
