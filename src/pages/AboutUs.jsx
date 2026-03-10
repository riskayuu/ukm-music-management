import { useState } from 'react';
import Testimoni from "../components/testimoni";
import { motion, AnimatePresence } from "framer-motion";
import "boxicons/css/boxicons.min.css";

function AboutUs() {
  const [isMusicDivisiOpen, setIsMusicDivisiOpen] = useState(false);
  const [isEOdivisiOpen, setIsEOdivisiOpen] = useState(false);
  const [isEventTerakhirOpen, setIsEventTerakhirOpen] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isPrestasiOpen, setIsPrestasiOpen] = useState(false);

  const toggleMusicDivisi = () => setIsMusicDivisiOpen(!isMusicDivisiOpen);
  const toggleEOdivisi = () => setIsEOdivisiOpen(!isEOdivisiOpen);
  const toggleEventTerakhir = () => setIsEventTerakhirOpen(!isEventTerakhirOpen);
  const togglePrestasi = () => setIsPrestasiOpen(!isPrestasiOpen);

  const SectionCard = ({ title, isOpen, onToggle, icon, children, bgColor }) => (
    <motion.div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden mb-6 ${bgColor}`}
      whileHover={{ boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
    >
      <motion.button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between"
        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isOpen ? 'bg-blue-500' : 'bg-gray-100'
          }`}>
            <i className={`bx ${icon} text-2xl ${isOpen ? 'text-white' : 'text-blue-500'}`}></i>
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <i className="bx bx-chevron-down text-2xl"></i>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const images = [
    { src: "/images/foto1.JPG", title: "Band Performance" },
    { src: "/images/foto2.JPG", title: "Band Performance" },
    { src: "/images/foto3.JPG", title: "Band Performance" },
    { src: "/images/foto4.JPG", title: "Practice Session" },
    { src: "/images/foto5.JPG", title: "Band Performance" },
    { src: "/images/foto6.JPG", title: "Band Performance" },
    { src: "/images/foto7.JPG", title: "Band Performance" },
    { src: "/images/foto8.JPG", title: "Band Performance" },
    { src: "/images/foto9.JPG", title: "Community Gathering" },
    { src: "/images/foto10.JPG", title: "Community Gathering" },
    { src: "/images/foto11.JPG", title: "Community Gathering" },
    { src: "/images/foto12.JPG", title: "Community Gathering" },
    { src: "/images/foto13.JPG", title: "Community Gathering" },
    { src: "/images/foto14.JPG", title: "Community Gathering" },
    { src: "/images/foto15.JPG", title: "Band Performance" },
    { src: "/images/foto16.JPG", title: "Community Gathering" },
    { src: "/images/foto17.JPG", title: "Community Gathering" },
    { src: "/images/foto18.JPG", title: "Band Performance" },
    { src: "/images/foto22.JPG", title: "Community Gathering" },
    { src: "/images/foto23.JPG", title: "Community Gathering" },
    { src: "/images/foto24.JPG", title: "Community Gathering" },
    { src: "/images/foto25.JPG", title: "Community Gathering" },
    { src: "/images/foto26.JPG", title: "Band Performance" },
    { src: "/images/foto27.JPG", title: "Community Gathering" },
    { src: "/images/foto28.JPG", title: "Community Gathering" },
    { src: "/images/foto29.JPG", title: "Community Gathering" },
    { src: "/images/foto30.JPG", title: "Band Performance" },
    { src: "/images/foto31.JPG", title: "Band Performance" },
    // Add more images as needed
  ];

  const ImageGallery = () => {
    const displayedImages = showAllImages ? images : images.slice(0, 6);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 mb-16"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Galeri Kegiatan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedImages.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="relative group overflow-hidden rounded-xl shadow-lg"
            >
              <motion.img
                src={image.src}
                alt={image.title}
                className="w-full h-64 object-cover"
                initial={{ scale: 1.2 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {images.length > 6 && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setShowAllImages(!showAllImages)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center mx-auto space-x-2"
            >
              <span>{showAllImages ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua'}</span>
              <i className={`bx ${showAllImages ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
            </button>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 mt-20"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">
          <i className="bx bx-music text-blue-500 mr-2"></i>
          Tentang UKM Seni Musik UAD
        </h1>
        <p className="text-gray-600 mb-4">Wadah kreativitas dan pengembangan bakat musik mahasiswa</p>
        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <img
            src="/images/foto11.JPG"
            alt="UKM Seni Musik UAD"
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <i className="bx bx-info-circle text-2xl text-white"></i>
            </div>
            <div className="text-justify space-y-4">
              <p className="text-gray-700 leading-relaxed">
                UKM Seni Musik UAD merupakan wadah bagi mahasiswa yang memiliki minat dan bakat dalam bidang musik.
                Kami memfasilitasi pengembangan kreativitas dan kemampuan bermusik anggota melalui berbagai kegiatan dan program.
                UKM Seni Musik berdiri pada tanggal 1 September 1998 bertempat di area Universitas Ahmad Dahlan Yogyakarta. UKM Seni Musik adalah wahana dan sarana pengembangan kemampuan dan kreatifitas anggota dalam kemampuannya menuju peningkatan wawasan dan keilmuan dalam bidangnya yang khas. 
              </p>

              <p className="text-gray-700 leading-relaxed">
                Tujuan: UKM Seni Musik UAD bertujuan untuk mengumpulkan dan mengembangkan kemampuan dan daya kreatifitas mahasiswa dalam kegiatan ekstrakurikuler dibidang music khususnya dan membentuk kader-kader yang berkualitas, mandiri, kreatif, inovatif, serta tanggung jawab dalam hal organisasi. Dalam perjalanannya UKM Seni Musik mempunyai dua divisi yaitu divisi Musik dan divisi Event Organizer  
              </p>
            </div>
          </div>
        </motion.div>

        <SectionCard
          title="Divisi Musik"
          isOpen={isMusicDivisiOpen}
          onToggle={toggleMusicDivisi}
          icon="bx-music"
          bgColor="bg-gradient-to-br from-blue-50 to-white"
        >
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Divisi Musik menjadi wadah bagi anggota untuk menyalurkan bakat dan kreativitas di bidang musik.
              Anggota yang tergabung dalam divisi ini didorong untuk mengembangkan kemampuan mereka dalam bermusik,
              baik secara individu maupun dalam sebuah band atau kelompok. Kegiatan divisi ini mencakup latihan rutin,
              workshop, kolaborasi lintas genre, dan berbagai penampilan dalam acara kampus maupun di luar kampus,
              
            </p>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <i className="bx bx-guitar text-blue-500"></i>
              <span>Band</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <i className="bx bx-microphone text-blue-500"></i>
              <span>Vokal</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <i className="bx bx-music text-blue-500"></i>
              <span>Orchestra</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Divisi Event Organizer"
          isOpen={isEOdivisiOpen}
          onToggle={toggleEOdivisi}
          icon="bx-calendar-event"
          bgColor="bg-gradient-to-br from-purple-50 to-white"
        >
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Divisi Event Organizer dirancang untuk melatih dan mengembangkan kemampuan anggota dalam merancang,
              mengelola, dan menyelenggarakan berbagai acara musik. Melalui serangkaian kegiatan seperti konser,
              festival seni, dan pertunjukan kreatif lainnya, anggota Divisi EO mendapatkan pengalaman langsung
              dalam dunia event management.
            </p>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <i className="bx bx-calendar text-purple-500"></i>
              <span>Perencanaan Event</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <i className="bx bx-broadcast text-purple-500"></i>
              <span>Publikasi</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <i className="bx bx-money text-purple-500"></i>
              <span>Sponsorship</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard
  title="Prestasi"
  isOpen={isPrestasiOpen}
  onToggle={togglePrestasi}
  icon="bx-star"
  bgColor="bg-gradient-to-br from-white-100 to-white"
>
  <div className="space-y-4">
    <ul className="text-gray-700 leading-relaxed space-y-2">
      <li>
        <strong>Band-band UKM Seni Musik UAD</strong> kerap menjadi guest star di berbagai event.
      </li>
      <li>
        <strong>UAD Musik Peduli:</strong> 17 Mei 2003, mendatangkan NAFF di Sport Hall Kridosono.
      </li>
      <li>
        <strong>Acara Djogja Banget dan Djogja Unplugged:</strong> Mendatangkan bintang tamu band dari lokal Jogja, seperti Captain Jack, Es Nanas, Shakey, Cross Bottom, Choolkhas, Bre, Shopie, Newdays, Seventeen, serta Kertas, dll.
      </li>
      <li>
        <strong>Djogja Banget (9 Maret 2008):</strong> Menampilkan Talk Show dengan pembicara Erros Chandra (Sheilla On 7), Ajiek Tarmidzi (Dirut Fresh Magz), Indro Kimpling (Dirut Kabare Magz).
      </li>
      <li>
        <strong>Djogja Unplugged (22 Juni 2008):</strong> Menampilkan Sheilla On 7, Display, Sophie, Flings di Kampus 3 UAD.
      </li>
    </ul>
  </div>
</SectionCard>


      

        

        <SectionCard
  title="Event Terakhir"
  isOpen={isEventTerakhirOpen}
  onToggle={toggleEventTerakhir}
  icon="bx-calendar-star"
  bgColor="bg-gradient-to-br from-green-50 to-white"
>
  <div className="space-y-4">
    <ul className="text-gray-700 leading-relaxed space-y-2">
      <li>
        <strong>Launching Album Kompilasi #2:</strong> 5 Januari 2011, Auditorium Kampus I UAD.
      </li>
      <li>
        <strong>Milad 50th UAD Festival Band Pelajar se-DIY:</strong> 22 Januari 2011, Kampus I UAD, menampilkan RSG, Lopies, Karnaluna, Savior.
      </li>
      <li>
        <strong>Talkshow Djogja Indie Banget 2011:</strong> 10 Juni 2011, Goeboex Coffe Seturan, menampilkan Momo Captai Jack, Mahardika Adi (MD Prambors Radio), Pak Tri (Cekidot).
      </li>
      <li>
        <strong>Djogja Unplugged 2011:</strong> 1 Desember 2011, Kampus III UAD, Menampilkan SKJ, The Aline, Burger Time, FOXY, Jamzcoustic.
      </li>
      <li>
        <strong>Djogja Banget 2012:</strong> 22-23 Mei 2012, Kampus III UAD, menampilkan Endank Soekamti, Attack The Headline, Banana For Silvy.
      </li>
      <li>
        <strong>Djogja Banget 2013:</strong> 17 November 2013, Menampilkan Braves Boy, Apollo 10, Sangkakala, MFA, StickMan.
      </li>
      <li>
        <strong>Djogja Banget 2014:</strong> 6 Desember 2014, menampilkan Tiktok, Sisir Tanah, Half Eleven PM, Sea Horse, GIE, Pasar Ngasem.
      </li>
      <li>
        <strong>Djogja Banget 2015:</strong> 10-12 Juni 2015, menampilkan Cakka Nuraga, Demaba, Plan Up, Stickman, Ekonomi Akustik, Halaman Belakang Gedung Kebudayaan Yogyakarta.
      </li>
      <li>
        <strong>Djogja Unplugged 2016:</strong> 9 Desember 2016, menampilkan Fourtwnty, Rubah di Selatan, StickMan, Taman Budaya Yogyakarta.
      </li>
      <li>
        <strong>Djogja Unplugged 2017:</strong> Desember 2017, menampilkan Tiga Pagi, Sahsaka, Half Eleven PM, Sumber Roso Nuansa Ndeso.
      </li>
      <li>
        <strong>Dua Dekade 2018 (Konser Pesta Rindu):</strong> 18 November 2018, menampilkan Rubah di Selatan, Kharisma Keroncong, Jendela Band, New Ethnic, FKUKMMY, Jogja Blues Forum.
      </li>
      <li>
        <strong>Djodja Patah Hati 2019:</strong> 15 Desember 2019, menampilkan Nabiella Piguna, Symphony Kerontjong Moeda.
      </li>
      <li>
        <strong>Stand Up Music 2021:</strong> 28 November 2021, menampilkan Lintang Ariani, Komunitas Stand Up Indojogja, Dynamic Dino, Forum Komunikasi Unit Kegiatan Mahasiswa Musik Yogyakarta (FKUKMMY), Mabes Musik Project (MMP).
      </li>
      <li>
        <strong>Senandung Kemanusiaan 2022:</strong> 27 November 2022, menampilkan Kakilina, Intuisi, Jaringan Anak Bahasa, Murti Tri Utami, Forum Komunikasi Unit Kegiatan Mahasiswa Musik Yogyakarta (FKUKMMY), Mabes Musik Project (MMP).
      </li>
      <li>
        <strong>Djogja Banget 2022:</strong> 06 Mei 2023, menampilkan FSTVLST, Nona Sepatu Kaca, LOSSKITA (Kampus 4 UAD).
      </li>
    </ul>
    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
      <i className="bx bx-star text-green-500"></i>
      <span>Konser</span>
    </div>
    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
      <i className="bx bx-movie text-green-500"></i>
      <span>Talkshow</span>
    </div>
    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
      <i className="bx bx-gift text-green-500"></i>
      <span>Event Amal</span>
    </div>
  </div>
</SectionCard>




        <ImageGallery />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          
          <Testimoni />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AboutUs;
