import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import { db } from "../Firebase"; // Import konfigurasi Firebase
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const List = () => {
  const [anggotaList, setAnggotaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAnggota, setEditingAnggota] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    nim: "",
    program: "",
    semester: "",
    photo: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Fetch data dari Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "anggotaList"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAnggotaList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        showMessage("Gagal mengambil data", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // Handle delete anggota dengan konfirmasi
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      try {
        await deleteDoc(doc(db, "anggotaList", id.toString()));
        setAnggotaList((prevList) => prevList.filter((anggota) => anggota.id !== id));
        showMessage("Berhasil menghapus anggota");
      } catch (error) {
        console.error("Error deleting document:", error);
        showMessage("Gagal menghapus anggota", "error");
      }
    }
  };

  // Handle toggle status dengan feedback
  const handleToggleStatus = async (id) => {
    try {
      const anggota = anggotaList.find((anggota) => anggota.id === id);
      const newStatus = !anggota.isActive;
      const anggotaRef = doc(db, "anggotaList", id.toString());
      
      await updateDoc(anggotaRef, { isActive: newStatus });
      setAnggotaList((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, isActive: newStatus } : item
        )
      );
      showMessage(`Status berhasil diubah menjadi ${newStatus ? 'Aktif' : 'Tidak Aktif'}`);
    } catch (error) {
      console.error("Error updating status:", error);
      showMessage("Gagal mengubah status", "error");
    }
  };

  // Handle edit dengan validasi
  const handleSaveEdit = async (id) => {
    console.log(id)
    // Validasi input
    if (!editFormData.name || !editFormData.nim || !editFormData.program || !editFormData.semester) {
      showMessage("Semua field harus diisi!", "error");
      return;
    }

    try {
      const anggotaRef = doc(db, "anggotaList", id.toString());
      await updateDoc(anggotaRef, {
        name: editFormData.name,
        nim: editFormData.nim,
        program: editFormData.program,
        semester: editFormData.semester,
      });
      const querySnapshot = await getDocs(collection(db, "anggotaList"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(data);
      setAnggotaList((prevList) =>
        prevList.map((anggota) =>
          anggota.id === id ? { ...anggota, ...editFormData } : anggota
        )
      );
      setEditingAnggota(null);
      showMessage("Data berhasil diperbarui");
    } catch (error) {
      console.error("Error updating document:", error);
      showMessage("Gagal memperbarui data", "error");
    }
  };

  // Handle batal edit
  const handleCancelEdit = () => {
    setEditingAnggota(null);
    setEditFormData({
      name: "",
      nim: "",
      program: "",
      semester: "",
      photo: "",
    });
  };

  // Handle edit anggota
  const handleEdit = (anggota) => {
    setEditingAnggota(anggota.id);
    setEditFormData({
      name: anggota.name,
      nim: anggota.nim,
      program: anggota.program,
      semester: anggota.semester,
      photo: anggota.photo,
    });
  };

  // Handle perubahan input form edit
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-4xl text-blue-500"
        >
          <i className='bx bx-loader-alt'></i>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4"
    >
      {/* Message/Alert component */}
      <AnimatePresence>
        {message.text && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
              message.type === "error" ? "bg-red-500" : "bg-green-500"
            } text-white flex items-center space-x-2`}
          >
            <i className={`bx ${message.type === "error" ? "bx-x-circle" : "bx-check-circle"}`}></i>
            <span>{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold mb-6 text-center flex items-center justify-center"
      >
        <i className='bx bx-music text-blue-500 mr-2'></i>
        Daftar Anggota UKM Seni Musik UAD
      </motion.h1>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-4"
      >
        <Link
          to="/new-members"
          className="bg-green-500 text-white px-6 py-3 rounded-full shadow hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 mx-auto w-fit"
        >
          <i className='bx bx-plus-circle'></i>
          <span>Tambah Anggota Baru</span>
        </Link>
      </motion.div>

      <motion.ul 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {anggotaList.map((anggota, index) => (
          <motion.li
            key={anggota.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white border p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={anggota.photo}
                  alt={anggota.name}
                  className="w-24 h-24 rounded-full mb-4 shadow-md object-cover"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${
                    anggota.isActive ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-center">{anggota.name}</h2>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
              <p className="flex items-center">
                <i className='bx bx-id-card text-blue-500 mr-2'></i>
                <span><strong>NIM:</strong> {anggota.nim}</span>
              </p>
              <p className="flex items-center">
                <i className='bx bx-book text-blue-500 mr-2'></i>
                <span><strong>Program Studi:</strong> {anggota.program}</span>
              </p>
              <p className="flex items-center">
                <i className='bx bx-calendar text-blue-500 mr-2'></i>
                <span><strong>Semester:</strong> {anggota.semester}</span>
              </p>
            </div>

            <div className="flex justify-between mt-6 space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleToggleStatus(anggota.id)}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
              >
                <i className='bx bx-refresh'></i>
                <span>Status</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit(anggota)}
                className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-1"
              >
                <i className='bx bx-edit'></i>
                <span>Edit</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(anggota.id)}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
              >
                <i className='bx bx-trash'></i>
                <span>Hapus</span>
              </motion.button>
            </div>

            <AnimatePresence>
              {editingAnggota === anggota.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-gray-50 p-4 rounded-lg"
                >
                  <h3 className="font-semibold mb-2 flex items-center">
                    <i className='bx bx-edit-alt text-blue-500 mr-2'></i>
                    Edit Anggota
                  </h3>
                  {["name", "nim", "program", "semester", "photo"].map((field) => (
                    <div key={field} className="mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={editFormData[field]}
                        onChange={handleEditChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSaveEdit(anggota.id)}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center space-x-1"
                    >
                      <i className='bx bx-check'></i>
                      <span>Simpan</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center space-x-1"
                    >
                      <i className='bx bx-x'></i>
                      <span>Batal</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default List;
