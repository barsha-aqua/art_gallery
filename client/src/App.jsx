import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminManage from "./pages/AdminManage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import ArtworkDetail from "./pages/ArtworkDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Auctions from "./pages/Auctions";
import SelfPortraits from "./pages/SelfPortraits";
import Poems from "./pages/Poems";
import Terms from "./pages/Terms";
import heroImage from "./assets/hero_rose_vintage.jpg";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-canvas font-sans flex flex-col">
        <Navbar />

        <main
          className="flex-grow relative bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-canvas/60" />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/artwork/:id" element={<ArtworkDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manage" element={<AdminManage />} />
              <Route path="/auctions" element={<Auctions />} />
              <Route path="/portraits" element={<SelfPortraits />} />
              <Route path="/poems" element={<Poems />} />
              <Route path="/terms" element={<Terms />} />
              <Route
                path="*"
                element={
                  <div className="text-center py-32 text-stone-500">
                    Page not found or coming soon.
                  </div>
                }
              />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
