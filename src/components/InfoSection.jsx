import { BsInstagram, BsTwitter, BsFacebook, BsYoutube } from "react-icons/bs"; // Menggunakan react-icons untuk media sosial

function InfoSection() {
  return (
    <section className="info-section bg-gray-700 text-white p-8">
      <div className="container flex justify-between">
        {/* Kolom Hubungi Kami */}
        <div className="w-1/3">
          <h3 className="text-xl font-semibold mb-4">Hubungi Kami</h3>
          <p>Kampus 1 (Kantor Pusat)</p>
          <p>Jl. Kapas 9, Semaki, Umbulharjo, Yogyakarta 55166</p>
          <p>Telepon: (0274) 563515, 511830, 379418, 371120</p>
          <p>Faximille: 0274-564604</p>
          <p>Email: info[at]uad.ac.id</p>
        </div>

        {/* Kolom Media Sosial */}
        <div className="w-1/3">
          <h3 className="text-xl font-semibold mb-4">Temukan Kami</h3>
          <div className="flex space-x-4">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-pink-500 hover:scale-110 transition-all duration-300"
            >
              <BsInstagram size={30} />
            </a>

            {/* Twitter (X) */}
            <a 
              href="https://www.x.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-500 hover:scale-110 transition-all duration-300"
            >
              <BsTwitter size={30} />
            </a>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 hover:scale-110 transition-all duration-300"
            >
              <BsFacebook size={30} />
            </a>

            {/* YouTube */}
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-600 hover:scale-110 transition-all duration-300"
            >
              <BsYoutube size={30} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
