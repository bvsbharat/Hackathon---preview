import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { GitHubIcon, LinkIcon } from './Icons';

interface ProjectTableProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onUpdateProject: (project: Project, index: number) => void;
}

const EditableCell: React.FC<{
  value: string | number;
  projectIndex: number;
  columnKey: keyof Project;
  onUpdate: (projectIndex: number, columnKey: keyof Project, value: string) => void;
  className?: string;
}> = ({ value, projectIndex, columnKey, onUpdate, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (String(value) !== currentValue) {
      onUpdate(projectIndex, columnKey, currentValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setCurrentValue(String(value));
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="bg-white text-gray-900 w-full border border-gray-300 rounded-sm outline-none ring-2 ring-teal-500 px-2 py-1"
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`cursor-text w-full h-full p-1 -m-1 rounded-sm hover:bg-gray-100 transition-colors ${className}`}
      title="Click to edit"
    >
      {String(value)}
    </div>
  );
};


const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onSelectProject, onUpdateProject }) => {
  
  const handleCellUpdate = (projectIndex: number, columnKey: keyof Project, value: string) => {
    const projectToUpdate = projects[projectIndex];
    if (projectToUpdate) {
      const updatedProject = { 
        ...projectToUpdate, 
        [columnKey]: columnKey === 'rank' ? (parseInt(value, 10) || projectToUpdate.rank) : value 
      };
      onUpdateProject(updatedProject, projectIndex);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-teal-600">Project Submissions</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Links</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project, index) => (
                <tr 
                  key={project.id} 
                  onClick={() => onSelectProject(project)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    <EditableCell value={project.rank} projectIndex={index} columnKey="rank" onUpdate={handleCellUpdate} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                     <EditableCell value={project.teamName} projectIndex={index} columnKey="teamName" onUpdate={handleCellUpdate} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                     <EditableCell value={project.members} projectIndex={index} columnKey="members" onUpdate={handleCellUpdate} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                     <EditableCell value={project.total} projectIndex={index} columnKey="total" onUpdate={handleCellUpdate} className="text-teal-600" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-4">
                      {project.githubLink && project.githubLink !== 'N/A' && (
                         <a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="GitHub link">
                           <GitHubIcon className="w-5 h-5" />
                         </a>
                      )}
                      {project.youtubeLink && (
                         <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Demo link">
                           <LinkIcon className="w-5 h-5" />
                         </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {projects.length === 0 && (
          <p className="text-gray-400 text-center py-8">No projects to display.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectTable;