import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { CloseIcon, TrashIcon, UploadIcon } from './Icons';
import { parseProjects } from '../data/projects';

// A reusable inline editable cell component
const EditableCell: React.FC<{
  value: string | number;
  onUpdate: (value: string) => void;
  type?: 'text' | 'number';
}> = ({ value, onUpdate, type = 'text' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (String(value) !== currentValue) {
      onUpdate(currentValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    else if (e.key === 'Escape') {
      setCurrentValue(String(value));
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type={type}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="bg-gray-900 text-white w-full border-0 rounded-sm outline-none ring-2 ring-cyan-500 p-1 text-sm"
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-text w-full h-full p-1 -m-1 rounded-sm hover:bg-gray-700/50 transition-colors truncate"
      title={String(value)}
    >
      {String(value)}
    </div>
  );
};

const projectColumns: { key: keyof Project; label: string; type?: 'number' }[] = [
    { key: 'rank', label: 'Rank', type: 'number' },
    { key: 'teamName', label: 'Team Name' },
    { key: 'members', label: 'Members' },
    { key: 'teamSize', label: 'Team Size' },
    { key: 'impact', label: 'Impact' },
    { key: 'demo', label: 'Demo' },
    { key: 'creativity', label: 'Creativity' },
    { key: 'pitch', label: 'Pitch' },
    { key: 'total', label: 'Total' },
    { key: 'highlights', label: 'Highlights' },
    { key: 'githubLink', label: 'GitHub' },
    { key: 'youtubeLink', label: 'YouTube' },
    { key: 'feedback', label: 'Feedback' },
];

interface EditDataModalProps {
  initialProjects: Project[];
  onSave: (newProjects: Project[]) => void;
  onClose: () => void;
  onReset: () => void;
}

const EditDataModal: React.FC<EditDataModalProps> = ({ initialProjects, onSave, onClose, onReset }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateCell = (projectIndex: number, columnKey: keyof Project, value: string) => {
    const updatedProjects = [...projects];
    const projectToUpdate = updatedProjects[projectIndex];
    if (projectToUpdate) {
        (projectToUpdate[columnKey] as any) = value;
        setProjects(updatedProjects);
    }
  };

  const handleAddRow = () => {
    const newProject: Project = {
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 0,
        rank: projects.length + 1,
        teamName: 'New Project',
        members: '', teamSize: '1', impact: '0', demo: '0',
        creativity: '0', pitch: '0', total: '0',
        highlights: '', githubLink: '', youtubeLink: '',
        feedback: '', videoInfo: null,
    };
    setProjects([...projects, newProject]);
  };

  const handleDeleteRow = (projectIndex: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
        setProjects(projects.filter((_, index) => index !== projectIndex));
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        try {
          const importedProjects = parseProjects(text);
          setProjects(importedProjects);
        } catch (error) {
          console.error("Error parsing CSV file:", error);
          alert("Failed to parse CSV file. Please check the file format and console for errors.");
        }
      }
    };
    reader.onerror = (e) => {
        console.error("Error reading file:", e);
        alert("Failed to read the file.");
    }
    reader.readAsText(file);
    
    // Reset file input value to allow re-uploading the same file
    if(event.target) {
        event.target.value = '';
    }
  };

  const handleSave = () => onSave(projects);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">Edit Project Data</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 flex-grow flex flex-col overflow-hidden">
          <p className="text-gray-400 mb-4 text-sm flex-shrink-0">
            Edit project data below. Your changes will be saved in your browser's local storage.
          </p>
          <div className="flex-grow overflow-auto custom-scrollbar border border-gray-700 rounded-md">
            <table className="min-w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700/50 sticky top-0">
                    <tr>
                        {projectColumns.map(({ key, label }) => (
                           <th key={key} scope="col" className="px-4 py-3 whitespace-nowrap">{label}</th>
                        ))}
                        <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {projects.map((project, projectIndex) => (
                        <tr key={project.id} className="hover:bg-gray-700/50">
                           {projectColumns.map(({ key, type }) => (
                            <td key={key} className="px-2 py-1 align-top">
                                <EditableCell 
                                    value={project[key] as string | number}
                                    type={type}
                                    onUpdate={(value) => handleUpdateCell(projectIndex, key, value)}
                                />
                            </td>
                           ))}
                           <td className="px-4 py-2 text-center align-middle">
                                <button onClick={() => handleDeleteRow(projectIndex)} className="text-gray-500 hover:text-red-500 transition-colors">
                                    <TrashIcon className="w-5 h-5"/>
                                </button>
                           </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
          <div className="mt-4 flex-shrink-0">
            <button onClick={handleAddRow} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm font-semibold">
                + Add Project
            </button>
          </div>
        </div>
        <footer className="flex justify-between items-center p-4 border-t border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={onReset}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              aria-label="Reset data to default"
            >
              Reset to Default
            </button>
            <button
              onClick={handleImportClick}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Import data from CSV"
            >
              <UploadIcon className="w-5 h-5" />
              <span>Import CSV</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv,text/csv"
              className="hidden"
            />
          </div>
          <div className="space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors font-semibold"
            >
              Save Changes
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EditDataModal;