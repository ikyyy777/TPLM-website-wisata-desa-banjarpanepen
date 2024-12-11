import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
  'https://images.unsplash.com/photo-1682687221038-404670f09ef1', 
  'https://images.unsplash.com/photo-1682687220063-4742bd7fd538'
];

export default function Hero() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <div className="relative h-full overflow-hidden">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={`${image}?auto=format&fit=crop&w=2000&q=80`}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" /> {/* Overlay gelap untuk kontras */}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-green-700 mb-6"
          >
            Desa Wisata Banjarpanepen
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-700 mb-8"
          >
            Kunjungi tempat wisata yang belum pernah anda kunjungi di Banjarpanepen
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold flex items-center mx-auto hover:bg-green-700 transition-colors shadow-lg hover:scale-105 transform duration-200"
            onClick={() => window.location.href = '/wisata'}
          >
            Mulai Menjelajah
            <ChevronRight className="ml-2 h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}