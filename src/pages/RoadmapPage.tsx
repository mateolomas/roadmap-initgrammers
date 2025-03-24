import React, { useState, useEffect } from 'react';
import RoadmapView from '../components/RoadmapView';
import { roadmapData } from '../data/roadmapData';
import { RoadmapPhase } from '../types/roadmap';

const RoadmapPage: React.FC = () => {
  const [userRoadmap, setUserRoadmap] = useState<RoadmapPhase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Calcular estadísticas generales
  const calculateStats = () => {
    if (!userRoadmap.length) return { total: 0, completed: 0, percentage: 0 };
    
    let totalSteps = 0;
    let completedSteps = 0;
    
    userRoadmap.forEach(phase => {
      totalSteps += phase.steps.length;
      completedSteps += phase.steps.filter(step => step.completed).length;
    });
    
    return {
      total: totalSteps,
      completed: completedSteps,
      percentage: Math.round((completedSteps / totalSteps) * 100)
    };
  };

  useEffect(() => {
    // Carga el roadmap inicial o desde localStorage si existe
    setIsLoading(true);
    try {
      const savedRoadmap = localStorage.getItem('userRoadmap');
      if (savedRoadmap) {
        setUserRoadmap(JSON.parse(savedRoadmap));
      } else {
        setUserRoadmap(roadmapData);
      }
    } catch (error) {
      console.error('Error loading roadmap data:', error);
      setUserRoadmap(roadmapData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Guarda en localStorage cuando el roadmap cambia
    if (userRoadmap.length > 0) {
      localStorage.setItem('userRoadmap', JSON.stringify(userRoadmap));
    }
  }, [userRoadmap]);

  const resetRoadmap = () => {
    setUserRoadmap(roadmapData);
    setShowResetConfirm(false);
  };

  const stats = calculateStats();

  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      {/* Header con título y botón de reset */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center md:text-left">Tu Ruta de Aprendizaje</h1>
        <button 
          onClick={() => setShowResetConfirm(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm transition-colors"
        >
          Restablecer progreso
        </button>
      </div>

      {/* Modal de confirmación para resetear */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-medium mb-3">¿Restablecer progreso?</h3>
            <p className="text-gray-600 mb-4">Esta acción eliminará todo tu progreso guardado. ¿Estás seguro?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={resetRoadmap}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Restablecer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Descripción y estadísticas */}
      <div className="mb-8">
        <p className="text-gray-600 mb-6 text-center md:text-left">
          Sigue estos pasos para completar tu formación en desarrollo web. Marca las tareas a medida que las completes.
        </p>
        
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Tareas completadas</div>
            <div className="text-2xl font-bold">{stats.completed} de {stats.total}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Progreso general</div>
            <div className="text-2xl font-bold">{stats.percentage}%</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Fases completadas</div>
            <div className="text-2xl font-bold">
              {userRoadmap.filter(phase => phase.completed).length} de {userRoadmap.length}
            </div>
          </div>
        </div>
      </div>
      
      {/* Estado de carga */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-[rgb(179,43,75)]/30 border-t-[rgb(179,43,75)] rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Cargando tu ruta de aprendizaje...</p>
        </div>
      ) : (
        <div className="w-full">
          <RoadmapView 
            roadmap={userRoadmap} 
            setRoadmap={setUserRoadmap} 
          />
        </div>
      )}
      
      {/* Ayuda o consejos */}
      <div className="mt-12 bg-[rgb(179,43,75)]/5 border border-[rgb(179,43,75)]/10 p-4 rounded-lg">
        <h3 className="font-medium text-[rgb(179,43,75)] mb-2">Consejos para tu ruta</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 text-[rgb(179,43,75)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Completa cada fase antes de avanzar a la siguiente para un aprendizaje óptimo.</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 text-[rgb(179,43,75)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Explora los recursos adicionales haciendo clic en cada paso para expandir los detalles.</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 text-[rgb(179,43,75)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Tu progreso se guarda automáticamente en este dispositivo.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RoadmapPage;