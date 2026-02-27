import React from 'react';
import { motion } from 'framer-motion';
import "boxicons/css/boxicons.min.css";

const Footer = () => {
  const socialLinks = [
    { icon: 'bxl-instagram', url: 'https://www.instagram.com/mabesmusikuad?igsh=MWhob2NoZzUzZjQ1ag==', label: 'Instagram' },
    { icon: 'bxl-youtube', url: 'https://youtube.com/@mabesmusikuad?si=JFvt_YExEhbhlFQz', label: 'YouTube' },
    { icon: 'bxl-whatsapp', url: 'https://wa.me/6212345678890', label: 'WhatsApp' },
  ];

  const quickLinks = [
    { label: 'Tentang Kami', url: '/about' },
    { label: 'Kegiatan', url: '/kegiatan' },
    { label: 'Pendaftaran', url: '/daftar' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="bx bx-music text-blue-400 mr-2"></i>
              UKM Seni Musik UAD
            </h3>
            <p className="text-gray-400 text-sm">
              Wadah kreativitas dan pengembangan bakat musik mahasiswa 
              Universitas Ahmad Dahlan Yogyakarta.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="bx bx-link text-blue-400 mr-2"></i>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <i className="bx bx-chevron-right mr-2"></i>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="bx bx-envelope text-blue-400 mr-2"></i>
              Hubungi Kami
            </h3>
            <div className="space-y-2 text-gray-400 mb-4">
              <p className="flex items-center">
                <i className="bx bx-map mr-2"></i>
                Kampus 4 UAD, Yogyakarta
              </p>
              <p className="flex items-center">
                <i className="bx bx-phone mr-2"></i>
                +62 123 4567 890
              </p>
              <p className="flex items-center">
                <i className="bx bx-envelope mr-2"></i>
                ukm.musik@uad.ac.id
              </p>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ y: -5 }}
                  className="bg-gray-700 p-2 rounded-full hover:bg-blue-500 transition-colors"
                  aria-label={social.label}
                >
                  <i className={`bx ${social.icon} text-xl`}></i>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} UKM Seni Musik UAD. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
