import React, { useEffect } from 'react';
import type { Project } from '../types';
import { CloseIcon, GitHubIcon, LinkIcon } from './Icons';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ScoreItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-1">
        <span className="text-gray-500">{label}:</span> 
        <span className="font-mono text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{value}</span>
    </div>
);

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900 truncate"><span className="text-sm font-normal bg-teal-500 text-white rounded-full px-3 py-1 mr-3">{`Rank ${project.rank}`}</span>{project.teamName}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              {project.videoInfo ? (
                  <iframe
                  className="w-full h-full"
                  src={project.videoInfo.embedUrl}
                  title={`${project.teamName} Demo`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  ></iframe>
              ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No video available.
                  </div>
              )}
          </div>

          <div>
              <h4 className="text-lg font-semibold mb-2 text-teal-600">Highlights & Supporting Evidence</h4>
              <p className="text-gray-700 whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-md">{project.highlights}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                  <div>
                      <h4 className="text-lg font-semibold mb-2 text-teal-600">Team Members</h4>
                      <p className="text-gray-600 whitespace-pre-wrap text-sm">{project.members}</p>
                  </div>
                  {project.feedback && project.feedback.trim() !== 'No feedback.' && (
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-teal-600">Feedback</h4>
                        <p className="text-gray-700 bg-gray-100 p-3 rounded-md text-sm italic">{project.feedback}</p>
                    </div>
                  )}
              </div>
              <div className="space-y-4">
                  <div>
                      <h4 className="text-lg font-semibold mb-2 text-teal-600">Scores</h4>
                      <div className="text-sm space-y-1">
                          <ScoreItem label="Impact" value={project.impact} />
                          <ScoreItem label="Demo" value={project.demo} />
                          <ScoreItem label="Creativity" value={project.creativity} />
                          <ScoreItem label="Pitch" value={project.pitch} />
                          <div className="!mt-3 pt-2 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-gray-700 font-bold text-base">Total:</span> 
                            <span className="font-mono font-bold text-xl text-teal-500 bg-gray-100 px-3 py-1 rounded">{project.total}</span>
                          </div>
                      </div>
                  </div>
                   <div>
                        <h4 className="text-lg font-semibold mb-3 text-teal-600">Links</h4>
                        <div className="space-y-2">
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors w-full">
                                <GitHubIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
                                <span className="text-blue-500 font-mono text-sm break-all">View on GitHub</span>
                            </a>
                            <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors w-full">
                                <LinkIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
                                <span className="text-blue-500 font-mono text-sm break-all">Watch Demo</span>
                            </a>
                        </div>
                    </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;