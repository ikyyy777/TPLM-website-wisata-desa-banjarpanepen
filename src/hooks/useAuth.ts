import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const authStore = createStore<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (username: string, password: string) => {
    try {
      console.log("Attempting to login with:", { username, password });
      const response = await fetch(import.meta.env.VITE_LOGIN_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response status:', response.status); // Log the response status
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data); // Log the response data
        localStorage.setItem('token', data.token);
        set({ isAuthenticated: true });
        return true;
      } else {
        console.error('Login failed:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  logout: () => {
    // First remove the token from localStorage
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    set({ isAuthenticated: false });

    // Check if the token exists before making the request
    if (token) {
        fetch(import.meta.env.VITE_LOGOUT_API, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);  // Optionally, handle the response here.
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    } else {
        console.error('No token found in localStorage');
    }
  }
  
}));

export const useAuth = () => useStore(authStore);
