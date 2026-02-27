import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "boxicons/css/boxicons.min.css";

function Kegiatan() {
  const kegiatanList = [
    { 
      id: 1, 
      name: "Latihan Band Mingguan", 
      date: "2024-01-20", 
      location: "Studio Musik UAD",
      icon: "bx-music",
      description: "Latihan rutin untuk mengembangkan kemampuan bermusik anggota",
      status: "Rutin",
      time: "15:00 - 17:00",
      penanggungJawab: "Koordinator Divisi Musik"
    },
    { 
      id: 2, 
      name: "Workshop Produksi Musik", 
      date: "2024-02-15", 
      location: "Lab Multimedia UAD",
      icon: "bx-laptop",
      description: "Workshop teknik recording dan mixing untuk produksi musik digital",
      status: "Terjadwal",
      time: "09:00 - 15:00",
      penanggungJawab: "Tim Produksi Musik"
    },
    {
      id: 3,
      name: "Pentas Seni Semester",
      date: "2024-03-25",
      location: "Auditorium UAD",
      icon: "bx-radio",
      description: "Showcase bakat dan kreativitas anggota UKM Musik",
      status: "Akan Datang",
      time: "19:00 - 22:00",
      penanggungJawab: "Divisi Event"
    },
    {
      id: 4,
      name: "Kelas Vokal",
      date: "2024-01-25",
      location: "Ruang Latihan Vokal",
      icon: "bx-microphone",
      description: "Pelatihan teknik vokal dan olah suara",
      status: "Mingguan",
      time: "13:00 - 15:00",
      penanggungJawab: "Pelatih Vokal"
    },
    {
      id: 5,
      name: "Kolaborasi Antar UKM",
      date: "2024-04-10",
      location: "Gedung Kesenian UAD",
      icon: "bx-group",
      description: "Kolaborasi musik dengan UKM seni lainnya",
      status: "Direncanakan",
      time: "16:00 - 20:00",
      penanggungJawab: "Koordinator Acara"
    },
    {
      id: 6,
      name: "Workshop Aransemen",
      date: "2024-02-28",
      location: "Studio Musik UAD",
      icon: "bx-note",
      description: "Pelatihan teknik aransemen musik modern",
      status: "Terjadwal",
      time: "14:00 - 17:00",
      penanggungJawab: "Tim Pengajar"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Rutin': 'bg-green-100 text-green-800',
      'Terjadwal': 'bg-blue-100 text-blue-800',
      'Akan Datang': 'bg-purple-100 text-purple-800',
      'Mingguan': 'bg-yellow-100 text-yellow-800',
      'Direncanakan': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <style>
          {`
            .agenda-kegiatan {
              position: relative;
              top: 80px; /* Turunkan komponen 80px ke bawah */
            }
  
            .agenda-kegiatan i {
              font-size: 36px;
              margin-right: 10px;
            }
          `}
        </style>
        <h1 className="text-4xl font-bold mb-4 agenda-kegiatan">
          <i className="bx bx-calendar-event text-blue-500 mr-2"></i>
          Agenda Kegiatan
        </h1>
        <p className="text-gray-600 mb-4">Jadwal kegiatan UKM Seni Musik UAD</p>
        
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kegiatanList.map((kegiatan, index) => (
          <motion.div
            key={kegiatan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <i className={`bx ${kegiatan.icon} text-3xl text-blue-500`}></i>
                  <h2 className="text-xl font-semibold ml-3">{kegiatan.name}</h2>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(kegiatan.status)}`}>
                  {kegiatan.status}
                </span>
              </div>
              
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <i className="bx bx-calendar mr-2"></i>
                  {kegiatan.date}
                </p>
                <p className="flex items-center">
                  <i className="bx bx-time mr-2"></i>
                  {kegiatan.time}
                </p>
                <p className="flex items-center">
                  <i className="bx bx-map mr-2"></i>
                  {kegiatan.location}
                </p>
                <p className="flex items-center">
                  <i className="bx bx-user mr-2"></i>
                  {kegiatan.penanggungJawab}
                </p>
                <p className="flex items-start">
                  <i className="bx bx-info-circle mr-2 mt-1"></i>
                  <span>{kegiatan.description}</span>
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4"
              >
                <Link
                  to={`/kegiatan/${kegiatan.id}`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full"
                >
                  <span>Detail Kegiatan</span>
                  <i className="bx bx-right-arrow-alt ml-2"></i>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Kegiatan;
