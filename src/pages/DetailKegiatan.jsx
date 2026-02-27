import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "boxicons/css/boxicons.min.css";

function DetailKegiatan() {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  const kegiatanDetails = {
    1: {
      name: "Latihan Band Mingguan",
      date: "2024-12-20",
      location: "Studio Musik UAD",
      description: "Latihan rutin ini dirancang untuk memperkuat kemampuan anggota dalam bermusik, mempererat kerja sama tim, serta meningkatkan kualitas performa setiap individu. Selain fokus pada teknik bermain alat musik, sesi ini juga melibatkan simulasi live performance agar anggota lebih percaya diri saat tampil di panggung.",
      icon: "bx-music",
      time: "15:00 - 17:00",
      penanggungJawab: "John Doe",
      kapasitas: "20 orang",
      fokusMingguan: [
        "Latihan harmoni antara vokal dan instrumen",
        "Sinkronisasi tempo dan dinamika lagu"
      ],
      aktivitasUtama: [
        "Pembagian kelompok berdasarkan instrumen (gitar, drum, bass, vokal)",
        "Latihan lagu pilihan untuk persiapan acara mendatang"
      ],
      evaluasi: [
        "Anggota akan mendapatkan umpan balik langsung dari koordinator musik"
      ],
      fasilitas: [
        "Studio musik lengkap dengan alat musik seperti gitar listrik, drum set, keyboard, dan sound system",
        "Refreshment ringan untuk peserta latihan"
      ],
      persyaratan: [
        "Membawa partitur lagu yang sudah disepakati",
        "Datang tepat waktu untuk memaksimalkan sesi latihan"
      ]
    },
    2: {
      name: "Workshop Produksi Musik",
      date: "2024-12-22",
      location: "Studio Musik Profesional UAD",
      description:
        "Workshop ini memberikan pelatihan intensif tentang proses produksi musik digital, mulai dari tahap rekaman hingga mastering. Peserta akan belajar menggunakan software produksi musik populer seperti FL Studio, Ableton Live, atau Logic Pro X, langsung dari mentor berpengalaman di bidang produksi musik.",
      icon: "bx-microphone",
      time: "09:00 - 15:00",
      penanggungJawab: "Jane Smith",
      kapasitas: "30 orang",
      materiWorkshop: [
        "Sesi 1 (09:00 - 10:30): Pengenalan dasar perangkat rekaman dan software DAW.",
        "Sesi 2 (10:30 - 12:00): Teknik rekaman vokal dan alat musik.",
        "Sesi 3 (13:00 - 15:00): Teknik mixing & mastering untuk menghasilkan musik berkualitas.",
      ],
      fasilitas: [
        "Studio rekaman lengkap untuk simulasi langsung.",
        "Materi presentasi dan template mixing yang dapat diunduh.",
        "Sertifikat partisipasi untuk seluruh peserta.",
      ],
      tips: [
        "Membawa laptop dengan software DAW yang telah terinstal.",
        "Membawa headphone untuk mendukung sesi mixing pribadi.",
      ],
    },
    3: {
      name: "Pentas Seni Semester",
      date: "2024-12-30",
      location: "Auditorium Kampus UAD",
      description:
        "Pentas Seni Semester adalah acara puncak untuk menampilkan karya seni dan bakat anggota UKM. Acara ini dihadiri oleh mahasiswa, dosen, serta undangan khusus seperti alumni dan komunitas seni dari luar kampus.",
      icon: "bx-paint",
      time: "19:00 - 22:00",
      penanggungJawab: "Sarah Alena",
      kapasitas: "150 orang",
      highlightAcara: [
        "Penampilan band internal UKM dan kolaborasi antar divisi seni.",
        "Penampilan spesial dari guest star (nama akan diumumkan mendekati acara).",
        "Pemberian penghargaan untuk penampilan terbaik.",
      ],
      rundownAcara: [
        "19:00 - 19:30: Pembukaan dan sambutan dari Ketua UKM.",
        "19:30 - 21:30: Penampilan seni utama.",
        "21:30 - 22:00: Penghargaan dan penutupan acara.",
      ],
      dressCode: "Semi-formal dengan sentuhan warna hitam atau emas.",
      fasilitasTambahan: [
        "Photobooth bertema seni di area pintu masuk.",
        "Stand makanan dan minuman di area luar auditorium.",
      ],
    },
    4: {
      name: "Kelas Vokal",
      date: "Setiap Sabtu",
      location: "Studio Musik Kampus",
      description:
        "Kelas vokal mingguan ini dirancang untuk membantu anggota mengembangkan kemampuan vokal mereka, baik dalam teknik dasar maupun lanjutan. Pelatih profesional akan memberikan bimbingan langsung terkait teknik bernyanyi, olah suara, dan ekspresi panggung.",
      icon: "bx-microphone",
      time: "15:00 - 17:00",
      fokusMingguIni: [
        "Teknik pernapasan yang benar untuk meningkatkan stamina suara.",
        "Latihan kontrol nada agar lebih stabil saat bernyanyi.",
        "Studi kasus lagu: Membawakan lagu dengan teknik storytelling.",
      ],
      aktivitasKelas: [
        "Pemanasan vokal dengan latihan skala nada.",
        "Latihan duet untuk melatih harmoni suara.",
        "Evaluasi individu oleh pelatih vokal.",
      ],
      tipsPeserta: [
        "Hindari minuman dingin sebelum kelas.",
        "Membawa air putih dan alat tulis untuk mencatat teori.",
      ],
    },
    
    5: {
      name: "Kolaborasi Antar UKM",
      date: "2025-01-15",
      location: "Gedung Serbaguna Kampus",
      description:
        "Acara ini adalah kesempatan untuk memperkuat hubungan antar UKM seni di UAD melalui kolaborasi kreatif. Setiap UKM akan berkontribusi dengan keahlian masing-masing untuk menghasilkan pertunjukan seni yang memukau.",
      icon: "bx-group",
      time: "09:00 - 16:00",
      temaAcara: 
        "'Keberagaman dalam Harmoni' – Sebuah eksplorasi seni yang menunjukkan bagaimana berbagai elemen seni dapat bersatu untuk menciptakan karya yang menakjubkan.",
      agendaKolaborasi: [
        "Kolaborasi musik dengan UKM tari untuk menciptakan pertunjukan yang dinamis.",
        "Pameran seni visual oleh UKM seni rupa sebagai latar pertunjukan.",
        "Diskusi panel tentang peran seni dalam membangun solidaritas mahasiswa.",
      ],
      targetPeserta: 
        "Semua anggota UKM seni dan kreatif di UAD.",
      persiapanPeserta: [
        "Menghadiri sesi gladi bersih sebelum acara.",
        "Membawa perlengkapan seni yang dibutuhkan sesuai tugas masing-masing.",
      ],
    },
    
    6: {
      name: "Workshop Aransemen",
      date: "2025-01-20",
      location: "Studio Musik Kampus",
      description:
        "Workshop ini bertujuan untuk membimbing peserta dalam menciptakan aransemen musik yang menarik, baik untuk keperluan band, orkestra, maupun produksi musik modern.",
      icon: "bx-music",
      time: "10:00 - 13:00",
      materiWorkshop: [
        "Penggunaan progresi chord kreatif.",
        "Teknik layering untuk harmoni vokal dan instrumen.",
        "Penyusunan elemen musik untuk genre tertentu (pop, jazz, klasik).",
      ],
      praktikLangsung: 
        "Peserta akan diminta membuat aransemen sederhana menggunakan partitur yang telah disediakan. Mentor akan memberikan umpan balik untuk setiap karya.",
      fasilitas: [
        "Alat musik lengkap di studio.",
        "Template partitur digital untuk latihan.",
      ],
      tipsPeserta: [
        "Membawa referensi lagu favorit sebagai inspirasi.",
        "Bersiap untuk diskusi dan evaluasi karya bersama mentor.",
      ],
    },    
  };

  const kegiatan = kegiatanDetails[id];

  if (!kegiatan) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <i className="bx bx-error-circle text-6xl text-red-500 mb-4"></i>
          <h1 className="text-2xl font-bold mb-2">Kegiatan Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-4">ID kegiatan: {id} tidak tersedia.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <i className="bx bx-arrow-back mr-2"></i>
            Kembali
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div 
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="p-8">
          <div className="flex items-center mb-6">
            <i className={`bx ${kegiatan.icon} text-4xl text-blue-500`}></i>
            <h1 className="text-3xl font-bold ml-4">{kegiatan.name}</h1>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <i className="bx bx-calendar mr-3"></i>
              <span>{kegiatan.date}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <i className="bx bx-time mr-3"></i>
              <span>{kegiatan.time}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <i className="bx bx-map mr-3"></i>
              <span>{kegiatan.location}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <i className="bx bx-user mr-3"></i>
              <span>PJ: {kegiatan.penanggungJawab}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <i className="bx bx-group mr-3"></i>
              <span>Kapasitas: {kegiatan.kapasitas}</span>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
              <p className="text-gray-600">{kegiatan.description}</p>
            </div>

            {kegiatan.fokusMingguan && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Fokus Minggu Ini</h2>
                <ul className="list-disc list-inside space-y-2">
                  {kegiatan.fokusMingguan.map((fokus, index) => (
                    <li key={index} className="text-gray-600 ml-4">{fokus}</li>
                  ))}
                </ul>
              </div>
            )}

            {kegiatan.aktivitasUtama && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Aktivitas Utama</h2>
                <ul className="list-disc list-inside space-y-2">
                  {kegiatan.aktivitasUtama.map((aktivitas, index) => (
                    <li key={index} className="text-gray-600 ml-4">{aktivitas}</li>
                  ))}
                </ul>
              </div>
            )}

            {kegiatan.evaluasi && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Evaluasi</h2>
                <ul className="list-disc list-inside space-y-2">
                  {kegiatan.evaluasi.map((evaluasi, index) => (
                    <li key={index} className="text-gray-600 ml-4">{evaluasi}</li>
                  ))}
                </ul>
              </div>
            )}

            {kegiatan.fasilitas && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Fasilitas yang Disediakan</h2>
                <ul className="list-disc list-inside space-y-2">
                  {kegiatan.fasilitas.map((fasilitas, index) => (
                    <li key={index} className="text-gray-600 ml-4">{fasilitas}</li>
                  ))}
                </ul>
              </div>
            )}

            {kegiatan.persyaratan && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Persyaratan Peserta</h2>
                <ul className="list-disc list-inside space-y-2">
                  {kegiatan.persyaratan.map((syarat, index) => (
                    <li key={index} className="text-gray-600 ml-4">{syarat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <motion.div 
            className="mt-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <i className="bx bx-arrow-back mr-2"></i>
              Kembali
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DetailKegiatan;