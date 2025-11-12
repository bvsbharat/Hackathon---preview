import React from 'react';
import type { Project } from '../types';
import { PlayIcon, CodeIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const score = project.total?.trim();
  const hasScore = score && !isNaN(parseInt(score, 10));
  const scoreValue = hasScore ? parseInt(score, 10) : 0;
  
  let scoreColor = 'bg-gray-600';
  if (scoreValue >= 90) scoreColor = 'bg-emerald-500';
  else if (scoreValue >= 85) scoreColor = 'bg-sky-500';
  else if (scoreValue >= 80) scoreColor = 'bg-amber-500';
  else if (hasScore) scoreColor = 'bg-red-500';
  
  return (
    <div 
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 group flex flex-col relative"
      onClick={() => onSelect(project)}
    >
      <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-60 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm shadow-md">
        {project.rank}
      </div>
      <div className="relative h-40 bg-gray-700">
        {project.videoInfo ? (
          <img src={project.videoInfo.thumbnailUrl} alt={project.teamName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CodeIcon className="w-12 h-12 text-gray-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayIcon className="w-16 h-16 text-white" />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg truncate text-white" title={project.teamName}>{project.teamName}</h3>
        <p className="text-sm text-gray-400 mt-1 flex-grow h-10 overflow-hidden" title={project.highlights}>
            {project.highlights}
        </p>
        <div className="flex justify-end items-center mt-3 pt-3 border-t border-gray-700">
            {hasScore && (
                <div className={`px-3 py-1 text-sm font-bold rounded-full ${scoreColor} text-white`}>
                    {scoreValue}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
