import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';

export default function UserHubungi() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <PageHeader
        title="Hubungi Kami"
        subtitle="Hubungi tim kami untuk merencanakan kunjungan Anda ke Desa Wisata Banjarpanepen"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4 mb-6">
                <Mail className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Email</h3>
                  <a href="mailto:info@travelvista.com" className="mt-2 text-gray-600 hover:text-green-600 block">
                    info@wisatabanjarpanepen.com
                  </a>
                  <a href="mailto:support@travelvista.com" className="mt-1 text-gray-600 hover:text-green-600 block">
                    support@wisatabanjarpanepen.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <Phone className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Telepon</h3>
                  <a href="tel:+62811234567" className="mt-2 text-gray-600 hover:text-green-600 block">
                    +62 81 1234 567 (Telepon)
                  </a>
                  <a href="tel:+62822345678" className="mt-1 text-gray-600 hover:text-green-600 block">
                    +62 82 2345 678 (WhatsApp)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Alamat Kantor</h3>
                  <p className="mt-2 text-gray-600">
                    Jl. Nama Jalan No. 123<br />
                    Kecamatan Nama Kecamatan, 12345<br />
                    Indonesia
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Jam Operasional</h3>
              <div className="space-y-2 text-gray-600">
                <p>Senin - Jumat: 09:00 - 17:00 WIB</p>
                <p>Sabtu: 09:00 - 15:00 WIB</p>
                <p>Minggu: Tutup</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Lokasi Kami</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Banjarpanepen&zoom=12&maptype=satellite"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}