import React from 'react';
import { RoadmapPhase } from '../types/roadmap';
import RoadmapStep from './RoadmapStep';
import ProgressTracker from './ProgressTracker';

interface RoadmapViewProps {
  roadmap: RoadmapPhase[];
  setRoadmap: React.Dispatch<React.SetStateAction<RoadmapPhase[]>>;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, setRoadmap }) => {

  console.log(roadmap, "dasd")
  const calculateProgress = () => {
    if (roadmap.length === 0) return 0;
    
    let totalSteps = 0;
    let completedSteps = 0;
    
    roadmap.forEach(phase => {
      totalSteps += phase.steps.length;
      completedSteps += phase.steps.filter(step => step.completed).length;
    });
    
    return Math.round((completedSteps / totalSteps) * 100);
  };
  
  const toggleStepCompletion = (phaseId: number, stepId: string) => {
    const updatedRoadmap = roadmap.map(phase => {
      if (phase.id === phaseId) {
        const updatedSteps = phase.steps.map(step => {
          if (step.id === stepId) {
            return { ...step, completed: !step.completed };
          }
          return step;
        });
        
        // Verificar si todos los pasos están completados
        const allStepsCompleted = updatedSteps.every(step => step.completed);
        
        return { 
          ...phase, 
          steps: updatedSteps,
          completed: allStepsCompleted
        };
      }
      return phase;
    });
    
    setRoadmap(updatedRoadmap);
  };
  
  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-gray-500">No hay contenido disponible en la ruta de aprendizaje.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full overflow-visible">
      <ProgressTracker progress={calculateProgress()} />
      
      <div className="space-y-8 mt-12">
        {roadmap.map((phase, index) => (
          <RoadmapStep 
            key={phase.id}
            phase={phase}
            isActive={!roadmap[index-1]?.completed && !phase.completed}
            isCompleted={phase.completed}
            toggleStepCompletion={toggleStepCompletion}
          />
        ))}
      </div>
    </div>
  );
};

export default RoadmapView;