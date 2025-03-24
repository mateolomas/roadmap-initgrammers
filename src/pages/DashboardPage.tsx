import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoadmapPhase } from '../types/roadmap';

const DashboardPage: React.FC = () => {
  const [userRoadmap, setUserRoadmap] = useState<RoadmapPhase[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nextSteps, setNextSteps] = useState<{phase: RoadmapPhase, stepIds: string[]}[]>([]);
  
  // Cargar datos del roadmap
  useEffect(() => {
    setIsLoading(true);
    try {
      const savedRoadmap = localStorage.getItem('userRoadmap');
      if (savedRoadmap) {
        const parsedRoadmap = JSON.parse(savedRoadmap);
        setUserRoadmap(parsedRoadmap);
        findNextSteps(parsedRoadmap);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Calcular las próximas tareas recomendadas
  const findNextSteps = (roadmap: RoadmapPhase[]) => {
    const recommendedSteps: {phase: RoadmapPhase, stepIds: string[]}[] = [];
    
    // Encuentra hasta 3 fases activas y obtén hasta 2 tareas pendientes de cada una
    for (const phase of roadmap) {
      const incompleteStepIds = phase.steps
        .filter(step => !step.completed)
        .map(step => step.id)
        .slice(0, 2);
      
      if (incompleteStepIds.length > 0) {
        recommendedSteps.push({
          phase: phase,
          stepIds: incompleteStepIds
        });
      }
      
      // Limita a 3 fases con tareas pendientes
      if (recommendedSteps.length >= 3) break;
    }
    
    setNextSteps(recommendedSteps);
  };

  // Calcular estadísticas de progreso
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

  const stats = calculateStats();

  // Determinar el nivel del usuario basado en el progreso
  const getUserLevel = () => {
    const percentage = stats.percentage;
    
    if (percentage >= 80) return { name: "Avanzado", color: "bg-[rgb(179,43,75)]" };
    if (percentage >= 40) return { name: "Intermedio", color: "bg-yellow-500" };
    return { name: "Principiante", color: "bg-blue-500" };
  };

  const level = getUserLevel();

  // Obtener la fecha de última actividad
  const getLastActivityDate = () => {
    const date = localStorage.getItem('lastActivity') 
      ? new Date(JSON.parse(localStorage.getItem('lastActivity') || '')) 
      : new Date();
    
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Estado de carga
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="inline-block w-8 h-8 border-4 border-[rgb(179,43,75)]/30 border-t-[rgb(179,43,75)] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel de control</h1>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <div className={`w-3 h-3 rounded-full ${level.color} mr-2`}></div>
          <span className="text-sm text-gray-600">Nivel: <span className="font-medium">{level.name}</span></span>
        </div>
      </div>
      
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-[rgb(179,43,75)]/10 p-3">
                <svg className="h-6 w-6 text-[rgb(179,43,75)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Tareas completadas</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{stats.completed}</div>
                  <div className="ml-2 text-sm text-gray-600">de {stats.total}</div>
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-[rgb(179,43,75)]/10 p-3">
                <svg className="h-6 w-6 text-[rgb(179,43,75)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Progreso general</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{stats.percentage}%</div>
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-[rgb(179,43,75)]/10 p-3">
                <svg className="h-6 w-6 text-[rgb(179,43,75)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Fases completadas</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{userRoadmap.filter(phase => phase.completed).length}</div>
                  <div className="ml-2 text-sm text-gray-600">de {userRoadmap.length}</div>
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-[rgb(179,43,75)]/10 p-3">
                <svg className="h-6 w-6 text-[rgb(179,43,75)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Última actividad</dt>
                <dd className="flex items-baseline">
                  <div className="text-sm font-semibold text-gray-900">{getLastActivityDate()}</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de progreso */}
        <div className="bg-white overflow-hidden shadow rounded-lg lg:col-span-2">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Progreso general</h3>
            
            <div className="space-y-4">
              {userRoadmap.map(phase => (
                <div key={phase.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {phase.id}. {phase.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {phase.steps.filter(step => step.completed).length} de {phase.steps.length}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[rgb(179,43,75)] h-2 rounded-full" 
                      style={{ 
                        width: `${Math.round((phase.steps.filter(step => step.completed).length / phase.steps.length) * 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <Link 
                to="/roadmap" 
                className="text-sm text-[rgb(179,43,75)] hover:text-[rgb(179,43,75)]/80 flex items-center"
              >
                Ver ruta completa
                <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Próximas tareas */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Próximas tareas</h3>
            
            {nextSteps.length > 0 ? (
              <div className="space-y-6">
                {nextSteps.map(({phase, stepIds}) => (
                  <div key={phase.id} className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-800">
                      {phase.id}. {phase.title}
                    </h4>
                    
                    <ul className="space-y-3">
                      {stepIds.map(stepId => {
                        const step = phase.steps.find(s => s.id === stepId);
                        return step ? (
                          <li key={stepId} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full border-2 border-[rgb(179,43,75)] flex items-center justify-center mr-2">
                              <span className="h-2 w-2 rounded-full bg-[rgb(179,43,75)]"></span>
                            </span>
                            <span className="text-sm text-gray-600">{step.name}</span>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">¡Felicidades! Has completado todas las tareas disponibles.</p>
            )}
            
            <div className="mt-6 flex justify-end">
              <Link 
                to="/roadmap" 
                className="text-sm text-[rgb(179,43,75)] hover:text-[rgb(179,43,75)]/80 flex items-center"
              >
                Ver todas las tareas
                <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recursos destacados */}
      <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recursos destacados</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Extraemos algunos recursos destacados del roadmap */}
            {userRoadmap.flatMap(phase => 
              phase.steps
                .filter(step => step.resources && step.resources.length > 0)
                .flatMap(step => step.resources || [])
            ).slice(0, 3).map((resource, index) => (
              <a 
                key={index}
                href={resource.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-[rgb(179,43,75)]/30 hover:bg-[rgb(179,43,75)]/5 transition-colors"
              >
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-[rgb(179,43,75)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <h4 className="ml-2 text-sm font-medium text-gray-900">{resource.title}</h4>
                </div>
                <p className="mt-2 text-xs text-gray-500">Recurso destacado para tu aprendizaje</p>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Consejos y mensajes motivacionales */}
      <div className="mt-6 bg-[rgb(179,43,75)]/5 border border-[rgb(179,43,75)]/10 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-[rgb(179,43,75)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-[rgb(179,43,75)]">Consejo del día</h3>
            <div className="mt-2 text-sm text-gray-600">
              <p>
                Recuerda tomar descansos regulares durante tu aprendizaje. La técnica Pomodoro (25 minutos de estudio seguidos de 5 minutos de descanso) puede ayudarte a mantener la concentración y productividad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;