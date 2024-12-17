import { motion } from 'framer-motion';

export default function ProfileDesa() {
  return (
    <section id="profile-desa" className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Profil Desa Banjarpanepen
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-600 leading-relaxed">
              Desa Wisata Banjarpanepen terletak di Kecamatan Sumpiuh Kabupaten Banyumas. Jarak dari ibukota kabupaten sejauh ± 35 km. Walaupun berjarak cukup jauh, akan tetapi Desa Bajarpanepen memiliki potensi wisata yang menarik, diantaranya Wisata Edukatif yaitu Pembuatan Gula kristal, Pembuatan Karag dan budidaya Madu Klanceng. Wisata Budaya berupa Tradisi Ruat Bumi oleh masyarakat setempat, Kungkum (berendam) di Kali Cawang pada malam Bulan Purnama setiap bulan Sadran/Saban dan fasilitas penginapan sudah tersedia 4 Homestay.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Desa ini juga memiliki cagar budaya yaitu Petilasan Patih Gajah Mada yang menurut cerita wrga setempat pernah menjadi petilasan Sang Patih, petiasan ini yang disebut Watu Jonggol. Kemudian terdapat wisata alam yaitu Kali Cawang, Curug Kelapa, dan Bukit Pengaritan. Desa Banjarpanepen dicanangkan oleh Bupati Banyumas sebagai "Desa Kerukunan" karena terdapat 4 keyakinan yang hidup rukun. Empat keyakinan tersebut yaitu: Islam, Kristen, Buddha dan kepercayaan terhadap Tuhan YME. Masing masing keyakinan tersebut memiliki tempat Ibadah di Desa Banjarpanepen.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Desa wisata Banjarpanepen memiliki banyak keindahan alam yang dapat dinikmati oleh wisatawan, diantaranya di kawasan pegunungan desa wisata Banjarpanepen terdapat hutan pinus dan karet yang dimiliki oleh perhutani dan dikelola oleh masyarakat lokal. Adapun wisatawan dapat menikmati keindahan alam tersebut bersama dengan cafe kopi terdekat. Selain itu terdapat sungai dengan air yang jernih yang sudah dibendung di Kalicawang untuk dinikmati oleh wisatawan untuk berenang.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-green-600 text-4xl font-bold mb-2">4</h3>
                <p className="text-gray-800">Agama & Kepercayaan</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-green-600 text-4xl font-bold mb-2">4</h3>
                <p className="text-gray-800">Homestay</p>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-green-600 text-4xl font-bold mb-2">3+</h3>
                <p className="text-gray-800">Wisata Alam</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                <h3 className="text-green-600 text-4xl font-bold mb-2">3+</h3>
                <p className="text-gray-800">Wisata Edukatif</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}