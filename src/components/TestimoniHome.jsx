import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import "boxicons/css/boxicons.min.css";

const TestimoniHome = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          orderBy("likes", "desc"),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <i className="bx bx-loader-alt bx-spin text-3xl text-blue-500"></i>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimoni, index) => (
        <motion.div
          key={testimoni.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
              {testimoni.name[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800">{testimoni.name}</h3>
              <p className="text-gray-600 mt-2">{testimoni.text}</p>
              <div className="flex items-center gap-4 mt-4">
                <span className="flex items-center text-green-600">
                  <i className="bx bxs-like mr-1"></i>
                  {testimoni.likes || 0}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TestimoniHome; 