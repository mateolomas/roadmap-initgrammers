import React, { useState } from 'react';
import { RoadmapPhase } from '../types/roadmap';

interface RoadmapStepProps {
  phase: RoadmapPhase;
  isActive: boolean;
  isCompleted: boolean;
  toggleStepCompletion: (phaseId: number, stepId: string) => void;
}

const RoadmapStep: React.FC<RoadmapStepProps> = ({ 
  phase, 
  isActive, 
  isCompleted, 
  toggleStepCompletion 
}) => {

  console.log(phase, "phe")
  // Estado para controlar qué pasos están expandidos
  const [expandedSteps, setExpandedSteps] = useState<{[key: string]: boolean}>({});
  
  // Función para alternar la expansión de un paso
  const toggleStepExpansion = (stepId: string, event?: React.MouseEvent) => {
    // Detener la propagación del evento si existe
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Actualizar el estado
    setExpandedSteps(prev => {
      const newState = {...prev};
      newState[stepId] = !prev[stepId];
      console.log("Expanded steps:", newState); // Para depuración
      return newState;
    });
  };
  
  // Verificar si un paso está expandido
  const isStepExpanded = (stepId: string) => {
    return Boolean(expandedSteps[stepId]);
  };
  
  // Verificar si un paso tiene detalles que mostrar
  const hasStepDetails = (step: any) => {
    return (step.description && step.description.length > 0) || 
           (step.resources && step.resources.length > 0);
  };
  
  return (
    <div 
      className={`rounded-lg border p-6 transition-all ${
        isActive 
          ? 'border-[rgb(179,43,75)] shadow-md bg-white' 
          : isCompleted 
            ? 'border-[rgb(179,43,75)/30] bg-[rgb(179,43,75)/5]' 
            : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-center mb-4">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 text-white font-bold ${
          isCompleted ? 'bg-[rgb(179,43,75)]' : 'bg-gray-700'
        }`}>
          {phase.id}
        </div>
        
        <h2 className="text-xl font-semibold flex-1">{phase.title}</h2>
        
        <span className="text-sm text-gray-500">
          {phase.estimated_time}
        </span>
      </div>
      
      <div className="mb-6 text-gray-600">
        {phase.description}
      </div>
      
      <ul className="space-y-4">
        {phase.steps.map(step => (
          <li key={step.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <div className="flex items-start">
              {/* Checkbox separado */}
              <div className="relative flex items-center pt-0.5 mr-3">
                <input 
                  type="checkbox" 
                  checked={step.completed} 
                  onChange={() => toggleStepCompletion(phase.id, step.id)}
                  className="sr-only"
                  id={`check-${phase.id}-${step.id}`}
                />
                <label 
                  htmlFor={`check-${phase.id}-${step.id}`} 
                  className={`w-5 h-5 border rounded flex items-center justify-center flex-shrink-0 cursor-pointer ${
                    step.completed 
                      ? 'bg-[rgb(179,43,75)] border-[rgb(179,43,75)]' 
                      : 'border-gray-300 hover:border-[rgb(179,43,75)]'
                  }`}
                >
                  {step.completed && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                    </svg>
                  )}
                </label>
              </div>
              
              {/* Contenido del paso */}
              <div className="flex-1">
                {/* Línea superior con título y botón de expansión */}
                <div className="flex justify-between items-center">
                  <button 
                    onClick={(e) => hasStepDetails(step) && toggleStepExpansion(step.id, e)}
                    className={`text-left ${hasStepDetails(step) ? 'cursor-pointer hover:text-[rgb(179,43,75)]' : ''} 
                      ${step.completed ? 'text-[rgb(179,43,75)]' : 'text-gray-700'}`}
                    disabled={!hasStepDetails(step)}
                  >
                    <span className={`${step.completed ? 'line-through' : ''} font-medium`}>
                      {step.name}
                    </span>
                  </button>

                  {/* Botón de flecha SEPARADO */}
                  {hasStepDetails(step) && (
                    <button 
                      onClick={(e) => toggleStepExpansion(step.id, e)}
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                      aria-label={isStepExpanded(step.id) ? "Colapsar detalles" : "Expandir detalles"}
                      type="button"
                    >
                      <svg 
                        className={`w-5 h-5 transform transition-transform ${isStepExpanded(step.id) ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Contenido expandible - SIEMPRE se renderiza pero con altura 0 cuando está colapsado */}
                <div 
                  className={`mt-2 transition-all duration-300 ease-in-out ${
                    isStepExpanded(step.id) 
                      ? 'h-auto max-h-[500px] opacity-100' 
                      : 'h-0 max-h-0 overflow-hidden opacity-0'
                  }`}
                >
                  {/* Descripción si existe */}
                  {step.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {step.description}
                    </p>
                  )}
                  
                  {/* Recursos si existen */}
                  {step.resources && step.resources.length > 0 && (
                    <ul className="space-y-2">
                      {step.resources.map((resource, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center hover:text-[rgb(179,43,75)] transition-colors"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoadmapStep;