import { useState, useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';
import Card from '../components/shared/Card';

interface Wisata {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
  kategori?: string;
  slug: string;
}

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default function UserWisata() {
  const [wisata, setWisata] = useState<Wisata[]>([]);
  const [categories, setCategories] = useState<string[]>(['semua']);
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_WISATA_CATEGORY_API, {
          method: 'GET'
        });
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setCategories(['semua', ...data]);
        } else if (data.status === 'error') {
          console.error('Error dari server:', data.message);
          setCategories(['semua']);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(['semua']);
      }
    };

    const fetchWisata = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(import.meta.env.VITE_WISATA_API);
        const data = await response.json();
        const wisataWithUpdates = data.map((wis: any) => ({
          ...wis,
          rating: Number(wis.rating),
          price: Number(wis.price),
          imageUrl: wis.imageUrl.startsWith('http') ? wis.imageUrl : `${import.meta.env.VITE_PUBLIC_URL}${wis.imageUrl}`,
          slug: createSlug(wis.title)
        }));
        setWisata(wisataWithUpdates.map((wis: Wisata) => ({
          ...wis,
          price: `Rp${wis.price.toLocaleString('id-ID')}`
        })));
      } catch (error) {
        console.error('Error fetching wisata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    fetchWisata();
  }, []);
  
  const filteredWisata = selectedCategory === 'semua' 
    ? wisata
    : wisata.filter(wis => wis.kategori?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <PageHeader
        title="Daftar Wisata Banjarpanepen"
        subtitle="Jelajahi wisata yang ada di Banjarpanepen"
      />
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen bg-white">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
            <div className="w-12 h-12 rounded-full border-4 border-t-green-500 animate-spin absolute top-0"></div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-gray-800 whitespace-nowrap">Pilih jenis wisata:</h3>
            <div className="flex flex-wrap gap-4 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-w-[128px] text-center whitespace-nowrap
                    ${selectedCategory === category 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWisata.map((wis) => (
              <Card key={wis.id} {...wis} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
