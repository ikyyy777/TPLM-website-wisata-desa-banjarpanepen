import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(username, password);
    if (success) {
      navigate('/admin/wisata');
    } else {
      setError('Login gagal. Periksa username dan password Anda.');
    }
  };

  // Fungsi untuk mengecek token, jika token valid maka akan diarahkan ke halaman admin panel
  const checkToken = async () => {
    try {
      setIsLoading(true);
      console.log('Checking token...');
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      
      if (!token) {
        console.log('No token found, redirecting to login...');
        window.location.href = '/admin/login';
        return;
      }
  
      console.log('Making request to check token...');
      const response = await fetch(import.meta.env.VITE_TOKEN_CHECK_API, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      console.log('Token check response:', data);
      
      if (data.status !== 'success') {
        console.log('Token check failed, redirecting to login...');
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      } else {
        window.location.href = '/admin/wisata';
        console.log('Token check successful');
      }
    } catch (error) {
      console.error('Error checking token:', error);
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    } finally {
      setIsLoading(false);
    }
  };  

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white text-gray-800 border-gray-300 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white text-gray-800 border-gray-300 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
          Login
        </button>
      </form>
    </div>
  );
}