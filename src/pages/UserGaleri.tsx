import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/shared/PageHeader';
import axios from 'axios';

interface GalleryItem {
  id: number;
  judul: string;
  deskripsi: string;
  imageUrl: string;
  tanggal: string;
}

export default function UserGaleri() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GALLERY_API);
        setGalleries(response.data as GalleryItem[]);
      } catch (error) {
        console.error('Error fetching galleries:', error);
      }
    };

    fetchGalleries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <PageHeader
        title="Galeri Foto"
        subtitle="Koleksi momen-momen indah dari berbagai destinasi wisata"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.imageUrl.startsWith('http') ? item.imageUrl : `${import.meta.env.VITE_PUBLIC_URL}${item.imageUrl}`}
                  alt={item.judul}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 text-xl font-semibold mb-2">{item.judul}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.deskripsi}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(item.tanggal).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}