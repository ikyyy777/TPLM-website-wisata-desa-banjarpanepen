import { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/shared/PageHeader';

interface Agenda {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export default function UserAgenda() {
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);

  const formatDate = (dateStr: string) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const date = new Date(dateStr);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatTime = (timeStr: string) => {
    return timeStr.substring(0, 5); // Hanya ambil HH:mm
  };

  const isEventPassed = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset waktu ke 00:00:00
    return eventDate < today;
  };

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const response = await axios.get<Agenda[]>(import.meta.env.VITE_AGENDA_API);
        // Sort agenda by date in descending order (newest first)
        const sortedAgenda = response.data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setAgendaList(sortedAgenda);
      } catch (error) {
        console.error('Error fetching agenda:', error);
      }
    };

    fetchAgenda();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <PageHeader
        title="Agenda"
        subtitle="Jadwal kegiatan dan acara mendatang"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">
          {agendaList.map((agenda) => (
            <div key={agenda.id} className="bg-white rounded-lg p-6 shadow-lg hover:bg-gray-50 transition duration-300">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{agenda.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isEventPassed(agenda.date) 
                    ? 'bg-red-100 text-red-900'
                    : 'bg-green-100 text-green-900'
                }`}>
                  {isEventPassed(agenda.date) ? 'Sudah Lewat' : 'Akan Datang'}
                </span>
              </div>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Tanggal:</span> {formatDate(agenda.date)}</p>
                <p><span className="font-semibold">Waktu:</span> {formatTime(agenda.time)}</p>
                <p><span className="font-semibold">Lokasi:</span> {agenda.location}</p>
                <p><span className="font-semibold">Deskripsi:</span> {agenda.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}