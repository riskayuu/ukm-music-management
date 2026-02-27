import React from "react";

const FotoKegiatan = () => {
  const fotoKegiatan = Array.from({ length: 20 }, (_, index) => `/images.jpg`);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Foto Kegiatan</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {fotoKegiatan.map((foto, index) => (
          <img
            key={index}
            src={foto}
            alt={`Foto ${index + 1}`}
            className="rounded shadow w-full h-48 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default FotoKegiatan;
