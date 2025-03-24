import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden min-h-[80vh]">
        {/* Background section */}
       <div className="absolute inset-0 z-0">
          <div className="absolute inset-y-0 right-0 w-full md:w-1/2 lg:w-3/5">
            <div className="relative h-full w-full">
              <div className="h-full w-full ">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgb(179,43,75)" strokeWidth="0.5" strokeOpacity="0.1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <circle cx="70" cy="30" r="20" fill="rgb(179,43,75)" fillOpacity="0.05" />
                  <circle cx="30" cy="70" r="15" fill="rgb(179,43,75)" fillOpacity="0.05" />
                  <path d="M80 80 Q 90 70, 95 85" stroke="rgb(179,43,75)" strokeWidth="2" fill="none" strokeOpacity="0.1" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16 md:py-24 flex items-center min-h-[80vh]">
            <div className="max-w-lg w-full md:mx-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight text-left">
                Bienvenido a tu Ruta de Aprendizaje
              </h1>

              <p className="text-xl text-gray-600 mb-10 text-left">
                Sigue tu hoja de ruta personalizada para comenzar con las habilidades de desarrollo web.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link to="/roadmap"
                  className="px-6 py-3 text-center rounded-md text-white bg-[rgb(179,43,75)] shadow-sm hover:bg-[rgb(179,43,75)]/90 focus:ring-2 focus:ring-[rgb(179,43,75)]/50 focus:outline-none transition-all no-underline w-full sm:w-auto">
                  Ver tu Ruta
                </Link>

                <Link to="/dashboard"
                  className="px-6 py-3 text-center rounded-md text-white bg-[rgb(179,43,75)]/80 shadow-sm hover:bg-[rgb(179,43,75)]/90 focus:ring-2 focus:ring-[rgb(179,43,75)]/50 focus:outline-none transition-all no-underline w-full sm:w-auto">
                  Panel de Control
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de características */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[rgba(179,43,75,0.1)] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[rgb(179,43,75)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Aprendizaje Estructurado</h3>
              <p className="text-gray-600">Sigue una ruta de aprendizaje cuidadosamente diseñada y adaptada a tus necesidades.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[rgba(179,43,75,0.1)] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[rgb(179,43,75)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Seguimiento de Progreso</h3>
              <p className="text-gray-600">Monitorea tu avance de aprendizaje con seguimiento visual de progreso.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[rgba(179,43,75,0.1)] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[rgb(179,43,75)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Recursos de Calidad</h3>
              <p className="text-gray-600">Accede a materiales de aprendizaje seleccionados por expertos de la industria.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center text-gray-500">
        <p>Portal de Capacitación</p>
      </footer>
    </div>
  );
}

export default HomePage;