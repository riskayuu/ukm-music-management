import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import "boxicons/css/boxicons.min.css";

const Testimoni = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimoni, setNewTestimoni] = useState("");
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [userVotes, setUserVotes] = useState({});

  useEffect(() => {
    fetchTestimonials();
    // Load user votes from localStorage
    const savedVotes = localStorage.getItem('testimoniVotes');
    if (savedVotes) {
      setUserVotes(JSON.parse(savedVotes));
    }
  }, []);

  const fetchTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !newTestimoni.trim()) return;

    try {
      await addDoc(collection(db, "testimonials"), {
        name: name,
        text: newTestimoni,
        likes: 0,
        dislikes: 0,
        timestamp: new Date()
      });
      setName("");
      setNewTestimoni("");
      setShowForm(false);
      fetchTestimonials();
    } catch (error) {
      console.error("Error adding testimonial:", error);
    }
  };

  const handleVote = async (id, type) => {
    // Check if user has already voted on this testimonial
    if (userVotes[id]) return;

    try {
      const testimoniRef = doc(db, "testimonials", id);
      const updatedTestimonials = testimonials.map(t => {
        if (t.id === id) {
          return {
            ...t,
            [type]: (t[type] || 0) + 1
          };
        }
        return t;
      });

      await updateDoc(testimoniRef, {
        [type]: testimonials.find(t => t.id === id)[type] + 1
      });

      // Save vote to localStorage
      const newVotes = { ...userVotes, [id]: type };
      localStorage.setItem('testimoniVotes', JSON.stringify(newVotes));
      setUserVotes(newVotes);
      setTestimonials(updatedTestimonials);
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4">
          <i className="bx bx-message-dots text-blue-500 mr-2"></i>
          Testimoni Anggota
        </h2>
        <p className="text-gray-600 mb-6">Apa kata mereka tentang UKM Seni Musik?</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center mx-auto"
        >
          <i className="bx bx-plus-circle mr-2"></i>
          Tambah Testimoni
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-8"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Testimoni</label>
              <textarea
                value={newTestimoni}
                onChange={(e) => setNewTestimoni(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                required
              />
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Kirim
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Batal
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {testimonials.map((testimoni) => (
          <motion.div
            key={testimoni.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                {testimoni.name[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{testimoni.name}</h3>
                <p className="text-gray-600 mt-2">{testimoni.text}</p>
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => handleVote(testimoni.id, 'likes')}
                    disabled={userVotes[testimoni.id]}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                      userVotes[testimoni.id] === 'likes'
                        ? 'bg-green-100 text-green-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <i className="bx bx-like"></i>
                    <span>{testimoni.likes || 0}</span>
                  </button>
                  <button
                    onClick={() => handleVote(testimoni.id, 'dislikes')}
                    disabled={userVotes[testimoni.id]}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                      userVotes[testimoni.id] === 'dislikes'
                        ? 'bg-red-100 text-red-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <i className="bx bx-dislike"></i>
                    <span>{testimoni.dislikes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimoni;
