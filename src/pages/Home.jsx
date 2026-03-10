import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

function Home() {
  const [anggotaBaru, setAnggotaBaru] = useState(0);
  const [totalAnggota, setTotalAnggota] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnggotaList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "anggotaList"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setTotalAnggota(data.length);
      } catch (error) {
        console.error("Error fetching anggotaList:", error);
      }
    };

    const fetchNewMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newMembers"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setAnggotaBaru(data.length);
      } catch (error) {
        console.error("Error fetching newMembers:", error);
      }
    };

    fetchAnggotaList();
    fetchNewMembers();
  }, []);

  const testimoni = [
    {
      id: 1,
      nama: "Andi",
      pesan: "Bergabung di UKM Musik UAD adalah pengalaman luar biasa! Saya belajar banyak tentang musik dan mendapatkan teman baru.",
      image: "/testimonial1.jpg"
    },
    {
      id: 2,
      nama: "Rina",
      pesan: "Saya merasa lebih percaya diri setelah ikut latihan band bersama teman-teman di UKM Musik.",
      image: "/testimonial2.jpg"
    },
  ];

  const fotoKegiatan = ["/preview 1.jpg", "/preview 2.jpg", "/preview 3.jpg"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-4 mb-12 bg-gradient-to-r from-blue-600 to-blue-400 text-white"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Selamat Datang di UKM Musik UAD
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg mb-8"
              >
                Wadah kreativitas dan pengembangan bakat musik mahasiswa UAD
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/daftar')}
              >
                Bergabung Sekarang
              </motion.button>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="md:w-1/2"
            >
              <img
                src="/images.jpg"
                alt="UKM Musik UAD"
                className="rounded-lg shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Statistik Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Statistik Anggota</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white shadow-lg"
          >
            <Link to="/list" className="block">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <i className="bx bx-group text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Total Anggota</h3>
                  <motion.p 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold"
                  >
                    {totalAnggota}
                  </motion.p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-white/80 hover:text-white transition-colors">
                <span className="text-sm">Lihat detail</span>
                <i className="bx bx-right-arrow-alt ml-2"></i>
              </div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-8 text-white shadow-lg"
          >
            <Link to="/new-members" className="block">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <i className="bx bx-user-plus text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Anggota Baru</h3>
                  <motion.p 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold"
                  >
                    {anggotaBaru}
                  </motion.p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-white/80 hover:text-white transition-colors">
                <span className="text-sm">Lihat detail</span>
                <i className="bx bx-right-arrow-alt ml-2"></i>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimoni Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Testimoni Anggota</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimoni.map((testi, index) => (
            <motion.div
              key={testi.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                    {testi.nama[0]}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{testi.nama}</h3>
                  <p className="text-gray-600 italic">"{testi.pesan}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Kegiatan Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-16"
      >
        
      </motion.section>

      {/* Foto Kegiatan Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Cuplikan Foto Kegiatan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {fotoKegiatan.map((foto, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={foto}
                alt={`Foto ${index + 1}`}
                className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="mt-8 text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => navigate('/about')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Lihat Semua Foto
          </button>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Home;
