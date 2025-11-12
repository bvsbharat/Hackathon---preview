import React, { useState, useEffect } from 'react';
import { rawData as defaultRawData, parseProjects, projectsToCsv } from './data/projects';
import type { Project } from './types';
import ProjectGrid from './components/ProjectTimeline';
import ProjectTable from './components/ProjectTable';
import ProjectModal from './components/ProjectModal';
import EditDataModal from './components/EditDataModal';
import { LogoIcon, EditIcon, GridViewIcon, TableViewIcon } from './components/Icons';

type ViewMode = 'grid' | 'table';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentRawData, setCurrentRawData] = useState<string>(defaultRawData);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('hackathonProjectData');
      if (savedData) {
        setCurrentRawData(savedData);
        setProjects(parseProjects(savedData));
      } else {
        setProjects(parseProjects(defaultRawData));
        setCurrentRawData(defaultRawData);
      }
    } catch (error) {
      console.error("Error loading or parsing project data:", error);
      setProjects(parseProjects(defaultRawData));
      setCurrentRawData(defaultRawData);
    }
  }, []);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleSaveData = (updatedProjectsFromModal: Project[]) => {
    try {
      // Convert to CSV
      const newRawData = projectsToCsv(updatedProjectsFromModal);
      
      // Re-parse to get all derived data like videoInfo
      const newProjects = parseProjects(newRawData);

      // Save and update state
      localStorage.setItem('hackathonProjectData', newRawData);
      setCurrentRawData(newRawData);
      setProjects(newProjects);
      setIsEditModalOpen(false);
    } catch (e) {
      console.error("Error saving project data:", e);
      alert("Failed to save data. Check the console for errors.");
    }
  };

  const handleResetData = () => {
    try {
      localStorage.removeItem('hackathonProjectData');
      setCurrentRawData(defaultRawData);
      setProjects(parseProjects(defaultRawData));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error resetting project data:", error);
    }
  };

  const handleUpdateProject = (updatedProject: Project, index: number) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = updatedProject;
    
    // Serialize and re-parse to handle derived data correctly (e.g. videoInfo)
    const newRawData = projectsToCsv(updatedProjects);
    const newProjects = parseProjects(newRawData);

    setCurrentRawData(newRawData);
    setProjects(newProjects);
    localStorage.setItem('hackathonProjectData', newRawData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col p-4 md:p-8">
      <header className="w-full max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <LogoIcon className="h-10 w-10 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Hackathon Finals Review</h1>
                <p className="text-gray-400">Ranked project submissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${viewMode === 'grid' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                  aria-label="Grid view"
                >
                  <GridViewIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-colors duration-200 ${viewMode === 'table' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                  aria-label="Table view"
                >
                  <TableViewIcon className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                aria-label="Edit project data"
              >
                <EditIcon className="h-5 w-5" />
                <span>Edit Data</span>
              </button>
            </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto">
        {viewMode === 'grid' ? (
          <ProjectGrid projects={projects} onSelectProject={handleSelectProject} />
        ) : (
          <ProjectTable 
            projects={projects} 
            onSelectProject={handleSelectProject} 
            onUpdateProject={handleUpdateProject}
          />
        )}
      </main>

      <footer className="w-full max-w-7xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Built for an amazing hackathon experience.</p>
      </footer>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}

      {isEditModalOpen && (
        <EditDataModal
          initialProjects={projects}
          onSave={handleSaveData}
          onClose={() => setIsEditModalOpen(false)}
          onReset={handleResetData}
        />
      )}
    </div>
  );
};

export default App;