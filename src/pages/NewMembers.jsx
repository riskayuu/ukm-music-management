import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import "boxicons/css/boxicons.min.css";

const NewMembers = () => {
  const [newMembers, setNewMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newMembers"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNewMembers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setShowDeleteConfirm(null);
    try {
      await deleteDoc(doc(db, "newMembers", id));
      setNewMembers(newMembers.filter(member => member.id !== id));
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Gagal menghapus anggota. Silakan coba lagi.");
    }
  };

  const filteredMembers = newMembers.filter((member) => {
    const searchTermLower = searchTerm.toLowerCase();
    if (searchBy === "name") {
      return member.name.toLowerCase().includes(searchTermLower);
    } else if (searchBy === "nim") {
      return member.nim.toLowerCase().includes(searchTermLower);
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-4xl text-blue-500"
        >
          <i className="bx bx-loader-alt"></i>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <style>
        {`
          .daftar-anggota-baru {
            position: relative;
            top: 90px; /* Turunkan komponen 80px ke bawah */
            font-size: 24px;
            font-weight: bold;
            color: #000;
          }

          .daftar-anggota-baru i {
            font-size: 36px;
            margin-right: 10px;
          }
        `}
      </style>
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 daftar-anggota-baru">
            <i className="bx bx-user-plus text-black mr-2"></i>
            Daftar Anggota Baru
          </h1>
          <p className="text-gray-600 mb-4">Kelola data anggota baru UKM Seni Musik UAD</p>
        </motion.div>
        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                <input
                  type="text"
                  placeholder={`Cari berdasarkan ${searchBy === 'name' ? 'nama' : 'NIM'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSearchBy("name")}
                  className={`px-6 py-3 rounded-lg flex items-center justify-center min-w-[120px] ${
                    searchBy === "name"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <i className="bx bx-user mr-2"></i>
                  Nama
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSearchBy("nim")}
                  className={`px-6 py-3 rounded-lg flex items-center justify-center min-w-[120px] ${
                    searchBy === "nim"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <i className="bx bx-id-card mr-2"></i>
                  NIM
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Member Button */}
        <div className="text-center mb-12">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/daftar"
              className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg"
            >
              <i className="bx bx-user-plus text-xl mr-2"></i>
          Mau jadi anggota? Yuk daftar!
        </Link>
          </motion.div>
      </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <i className="bx bx-search-alt text-6xl text-gray-400 mb-4"></i>
            <p className="text-xl text-gray-500">
              {searchTerm ? "Tidak ada anggota yang sesuai dengan pencarian" : "Belum ada anggota baru"}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <AnimatePresence>
              {filteredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {member.name[0].toUpperCase()}
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
                          <p className="text-gray-500">{member.nim}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {member.phone && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <i className="bx bx-phone text-xl text-blue-500 mr-3"></i>
                          <span className="text-gray-700">{member.phone}</span>
                        </div>
                      )}
                      {member.divisi && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <i className="bx bx-music text-xl text-blue-500 mr-3"></i>
                          <span className="text-gray-700">{member.divisi}</span>
                        </div>
                      )}
                      {member.address && (
                        <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <i className="bx bx-map text-xl text-blue-500 mr-3 mt-1"></i>
                          <span className="text-gray-700">{member.address}</span>
                        </div>
                      )}
                      {member.instrument && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <i className="bx bx-music text-xl text-blue-500 mr-3"></i>
                          <span className="text-gray-700">{member.instrument}</span>
                        </div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDeleteConfirm(member.id)}
                      className="mt-6 w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center shadow-md"
                    >
                      <i className="bx bx-trash text-xl mr-2"></i>
                      Hapus Anggota
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
              </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="text-center mb-6">
                  <i className="bx bx-error-circle text-5xl text-red-500"></i>
                  <h3 className="text-2xl font-bold mt-4">Konfirmasi Hapus</h3>
                  <p className="text-gray-600 mt-2">
                    Apakah Anda yakin ingin menghapus anggota ini? 
                    Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
                  >
                    <i className="bx bx-x text-xl mr-2"></i>
                    Batal
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDelete(showDeleteConfirm)}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                  >
                    <i className="bx bx-trash text-xl mr-2"></i>
                Hapus
                  </motion.button>
            </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
    </motion.div>
  );
};

export default NewMembers;