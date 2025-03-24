import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Organization Logo" 
              className="h-10 w-auto mr-4"
            />
          </div>
          
          <nav className="flex space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') ? 'text-[rgb(179,43,75)]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Inicio
            </Link>
            <Link 
              to="/roadmap" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/roadmap') ? 'text-[rgb(179,43,75)]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Ruta de aprendizaje
            </Link>
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/dashboard') ? 'text-[rgb(179,43,75)]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Panel de control
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;