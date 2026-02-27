import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import "boxicons/css/boxicons.min.css";

const InputField = ({ label, type, name, value, onChange, placeholder, required, icon }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="mb-6"
  >
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative rounded-lg shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className={`bx ${icon} text-gray-400 text-xl`}></i>
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        placeholder={placeholder}
        required={required}
      />
    </div>
  </motion.div>
);

const SelectField = ({ label, name, value, onChange, options, required, icon }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="mb-6"
  >
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative rounded-lg shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i className={`bx ${icon} text-gray-400 text-xl`}></i>
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        required={required}
      >
        <option value="">Pilih {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  </motion.div>
);

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    program: "",
    semester: "",
    batch: "",
    gender: "",
    birthdate: "",
    phone: "",
    email: "",
    address: "",
    instrument: "",
    divisi: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "newMembers"), {
        ...formData,
        timestamp: new Date(),
      });

      await setDoc(doc(db, "anggotaList", formData.nim), {
        ...formData,
        isActive: true,
        photo: "https://via.placeholder.com/150",
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <i className="bx bx-check-circle text-7xl text-green-500"></i>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Pendaftaran Berhasil!</h1>
          <p className="text-gray-600 mt-2">Selamat bergabung di UKM Seni Musik UAD</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Data Pendaftaran:</h2>
            <div className="space-y-3">
              {Object.entries(formData).map(([key, value]) => (
                value && key !== 'email' && (
                  <div key={key} className="flex items-center">
                    <i className="bx bx-check text-green-500 mr-2"></i>
                    <span className="font-medium capitalize">{key}:</span>
                    <span className="ml-2 text-gray-600">{value}</span>
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <div className="flex items-center text-blue-700">
              <i className="bx bxl-whatsapp text-2xl mr-2"></i>
              <span className="font-medium">Grup WhatsApp UKM Musik</span>
            </div>
            <a
              href="https://chat.whatsapp.com/tautan-grup"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <i className="bx bx-link-external mr-1"></i>
              Gabung Grup WhatsApp
            </a>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/" 
              className="flex items-center justify-center w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors"
            >
              <i className="bx bx-home-alt mr-2"></i>
              Kembali ke Beranda
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <motion.form
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl"
        onSubmit={handleSubmitClick}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <i className="bx bx-music text-6xl text-blue-500"></i>
          </motion.div>
          <h1 className="text-3xl font-bold mt-4">Formulir Pendaftaran</h1>
          <p className="text-gray-600 mt-2">UKM Seni Musik UAD</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <InputField 
                label="Nama Lengkap" 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Masukkan nama lengkap" 
                required 
                icon="bx-user"
              />

              <InputField 
                label="NIM" 
                type="text" 
                name="nim" 
                value={formData.nim} 
                onChange={handleChange} 
                placeholder="Masukkan NIM" 
                required 
                icon="bx-id-card"
              />

              <InputField 
                label="Program Studi" 
                type="text" 
                name="program" 
                value={formData.program} 
                onChange={handleChange} 
                placeholder="Masukkan program studi" 
                required 
                icon="bx-book"
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField 
                  label="Semester" 
                  type="number" 
                  name="semester" 
                  value={formData.semester} 
                  onChange={handleChange} 
                  placeholder="Semester" 
                  required 
                  icon="bx-calendar"
                />

                <InputField 
                  label="Angkatan" 
                  type="number" 
                  name="batch" 
                  value={formData.batch} 
                  onChange={handleChange} 
                  placeholder="Angkatan" 
                  required 
                  icon="bx-calendar-star"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <SelectField 
                label="Jenis Kelamin" 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                options={["Laki-laki", "Perempuan"]} 
                required 
                icon="bx-male-female"
              />

              <InputField 
                label="Tanggal Lahir" 
                type="date" 
                name="birthdate" 
                value={formData.birthdate} 
                onChange={handleChange} 
                required 
                icon="bx-calendar"
              />

              <InputField 
                label="Nomor Telepon" 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Masukkan nomor telepon" 
                required 
                icon="bx-phone"
              />

              <SelectField 
                label="Divisi" 
                name="divisi" 
                value={formData.divisi} 
                onChange={handleChange} 
                options={["Divisi Musik", "Divisi Event Organizer"]} 
                required 
                icon="bx-music"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <motion.button
              type="button"
              onClick={prevStep}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
            >
              <i className="bx bx-left-arrow-alt mr-2"></i>
              Sebelumnya
            </motion.button>
          )}
          
          {step < 2 ? (
            <motion.button
              type="button"
              onClick={nextStep}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors ml-auto"
            >
              Selanjutnya
              <i className="bx bx-right-arrow-alt ml-2"></i>
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors ml-auto"
            >
              <i className="bx bx-check-circle mr-2"></i>
              Periksa Data
            </motion.button>
          )}
        </div>
      </motion.form>

      {/* Modal Konfirmasi */}
      <AnimatePresence>
        {showConfirmation && (
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
              className="bg-white rounded-2xl p-6 max-w-lg w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-center">
                <i className="bx bx-info-circle text-blue-500 mr-2"></i>
                Konfirmasi Pendaftaran
              </h2>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold mb-3">Periksa data Anda:</h3>
                <div className="space-y-2">
                  {Object.entries(formData).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex items-start">
                        <i className="bx bx-check text-green-500 mr-2 mt-1"></i>
                        <div>
                          <span className="font-medium capitalize">{key}:</span>
                          <span className="ml-2 text-gray-600">{value}</span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors flex items-center justify-center"
                >
                  <i className="bx bx-x mr-2"></i>
                  Batal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmSubmit}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <i className="bx bx-loader-alt bx-spin mr-2"></i>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <i className="bx bx-check-circle mr-2"></i>
                      Konfirmasi
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default RegistrationForm;