
import React from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onSelectProject }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-cyan-300">Project Submissions</h2>
       {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onSelect={onSelectProject} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">No projects to display.</p>
      )}
    </div>
  );
};

export default ProjectGrid;
