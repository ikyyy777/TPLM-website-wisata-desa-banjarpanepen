import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface AdminWisata {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
  kategori: string;
}

export default function AdminWisata() {
  const [destinations, setDestinations] = useState<AdminWisata[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<AdminWisata>({
    title: '',
    description: '',
    imageUrl: '',
    price: 0,
    rating: 0,
    kategori: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [ratingError, setRatingError] = useState('');
  const [formattedPrice, setFormattedPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fungsi untuk mengambil data destinations
  const fetchDestinations = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_WISATA_API);
      setDestinations(response.data as AdminWisata[]);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast.error('Gagal mengambil data destinasi');
    }
  };

  // Fungsi untuk mengambil data kategori
  const fetchCategories = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_WISATA_CATEGORY_API);
      setCategories(response.data as string[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Gagal mengambil data kategori');
    }
  };

  useEffect(() => {
    fetchDestinations();
    fetchCategories();
  }, []);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // Buat URL preview untuk gambar yang dipilih
      setFormData({
        ...formData,
        imageUrl: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  // Format currency
  const formatCurrency = (value: string) => {
    const number = value.replace(/[^\d]/g, '');
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Number(number));
  };

  // Handle input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'price') {
      const formattedValue = formatCurrency(value);
      setFormattedPrice(formattedValue);
      const numericValue = Number(value.replace(/[^\d]/g, ''));
      setFormData(prev => ({
        ...prev,
        price: numericValue
      }));
    } else if (name === 'rating') {
      const ratingValue = parseFloat(value);
      if (ratingValue > 5) {
        setRatingError('Rating tidak boleh lebih dari 5');
      } else {
        setRatingError('');
        setFormData(prev => ({
          ...prev,
          rating: ratingValue
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  // Handle tambah kategori baru
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error('Nama kategori tidak boleh kosong');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(import.meta.env.VITE_WISATA_CATEGORY_API, {
        name: newCategory.toLowerCase()
      });

      const data = response.data as { status: string };
      if (data.status === 'success') {
        fetchCategories();
        setNewCategory('');
        toast.success('Kategori berhasil ditambahkan');
      } else {
        toast.error((response.data as { message?: string }).message || 'Gagal menambahkan kategori');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Gagal menambahkan kategori');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle hapus kategori
  const handleDeleteCategory = async (category: string) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Kategori "${category}" akan dihapus!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        const response = await axios.delete(`${import.meta.env.VITE_WISATA_CATEGORY_API}?name=${category}`);
        const data = response.data as { status: string };
        
        if (data.status === 'success') {
          fetchCategories();
          toast.success('Kategori berhasil dihapus');
        } else {
          toast.error('Gagal menghapus kategori');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Gagal menghapus kategori');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (ratingError) {
      toast.error('Harap perbaiki error pada rating sebelum submit');
      return;
    }

    try {
      // Set loading state
      setIsLoading(true);
      setUploadProgress(0);

      // Upload gambar terlebih dahulu
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', selectedFile);
        const uploadResponse = await axios.post(
            import.meta.env.VITE_UPLOAD_API,
            imageFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: (event: ProgressEvent) => {
                const progress = event.total
                  ? Math.round((event.loaded * 100) / event.total)
                  : 0;
                setUploadProgress(progress);
              }
            } as any
          );
        formData.imageUrl = import.meta.env.VITE_PUBLIC_URL + (uploadResponse.data as { imageUrl: string }).imageUrl;
      }

      if (editMode && selectedId) {
        // Update existing destination
        await axios.put(import.meta.env.VITE_WISATA_API, {
          ...formData,
          id: selectedId
        });
      } else {
        // Create new destination
        await axios.post(import.meta.env.VITE_WISATA_API, formData);
      }

      // Reset form dan refresh data
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        price: 0,
        rating: 0,
        kategori: ''
      });
      setFormattedPrice('');
      setSelectedFile(null);
      setEditMode(false);
      setSelectedId(null);
      setUploadProgress(0);
      fetchDestinations();
      
      setIsLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: editMode ? 'Destinasi berhasil diperbarui!' : 'Destinasi berhasil ditambahkan!',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setUploadProgress(0);
      toast.error('Terjadi kesalahan saat menyimpan data');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data wisata akan dihapus permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        await axios.delete(`${import.meta.env.VITE_WISATA_API}?id=${id}`);
        fetchDestinations();
        setIsLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: 'Data wisata berhasil dihapus.',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting destination:', error);
        setIsLoading(false);
        toast.error('Gagal menghapus destinasi');
      }
    }
  };

  return (
    <div className="container mx-auto p-6 relative">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kelola Wisata</h2>
      
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Judul</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 text-gray-800"
                placeholder="Masukkan judul wisata"
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Harga</label>
              <input
                type="text"
                name="price"
                value={formattedPrice}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300 text-gray-800"
                placeholder="Masukkan harga"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleInputChange}
                className={`w-full p-2 rounded border border-gray-300 text-gray-800 ${ratingError ? 'border-red-500' : ''}`}
                placeholder="Masukkan rating (0-5)"
                required
                disabled={isLoading}
              />
              {ratingError && <p className="text-red-500 text-sm mt-1">{ratingError}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Kategori</label>
              <div className="flex gap-2">
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border border-gray-300 text-gray-800"
                  required
                  disabled={isLoading}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="p-2 rounded border border-gray-300 text-gray-800"
                    placeholder="Kategori baru"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                    disabled={isLoading}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Daftar kategori dengan tombol hapus */}
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center bg-gray-100 rounded px-2 py-1">
                    <span className="text-gray-800 mr-2">{category}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(category)}
                      className="text-red-500 hover:text-red-700"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Gambar</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 text-gray-800"
                accept="image/*"
                disabled={isLoading}
              />
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-700 text-sm mt-1">{uploadProgress}% Uploaded</p>
                </div>
              )}
              {formData.imageUrl && (
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-gray-300 text-gray-800"
              rows={4}
              placeholder="Masukkan deskripsi wisata"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!!ratingError || isLoading}
          >
            {editMode ? 'Update Destinasi' : 'Tambah Destinasi'}
          </button>
        </form>
      </div>

      {/* Tabel Destinasi */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-gray-800">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left">Gambar</th>
                <th className="p-3 text-left">Judul</th>
                <th className="p-3 text-left">Deskripsi</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((destination) => (
                <tr key={destination.id} className="border-b border-gray-200">
                  <td className="p-3">
                    <img
                      src={destination.imageUrl.startsWith('http') ? destination.imageUrl : `${import.meta.env.VITE_PUBLIC_URL}${destination.imageUrl}`}
                      alt={destination.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{destination.title}</td>
                  <td className="p-3">{destination.description}</td>
                  <td className="p-3">{new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                  }).format(destination.price)}</td>
                  <td className="p-3">{destination.rating}</td>
                  <td className="p-3">{destination.kategori}</td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setSelectedId(destination.id ?? null);
                        setFormData(destination);
                        setFormattedPrice(formatCurrency(destination.price.toString()));
                      }}
                      className="mr-2 px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                      disabled={isLoading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => destination.id && handleDelete(destination.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      disabled={isLoading}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}