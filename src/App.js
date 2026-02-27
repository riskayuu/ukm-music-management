import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Kegiatan from "./pages/Kegiatan";
import DetailKegiatan from "./pages/DetailKegiatan";
import NotFound from "./pages/NotFound";
import RegistrationForm from "./pages/Daftar";
import AnggotaList from "./pages/List";
import NewMembers from "./pages/NewMembers"; // Import NewMembers

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/kegiatan" element={<Kegiatan />} />
            <Route path="/kegiatan/:id" element={<DetailKegiatan />} /> {/* Perbaiki rute ini */}
            <Route path="/new-members" element={<NewMembers />} /> {/* Tambahkan route baru */}
            <Route path="*" element={<NotFound />} />
            <Route path="/daftar" element={<RegistrationForm />} />
            <Route path="/list" element={<AnggotaList />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
