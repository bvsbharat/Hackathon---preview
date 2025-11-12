export interface VideoInfo {
  embedUrl: string;
  thumbnailUrl: string;
  source: 'YouTube' | 'Loom' | 'Vimeo' | 'Other';
}

export interface Project {
  id: number;
  rank: number;
  teamName: string;
  members: string;
  teamSize: string;
  impact: string;
  demo: string;
  creativity: string;
  pitch: string;
  total: string;
  highlights: string;
  githubLink: string;
  youtubeLink: string;
  feedback: string;
  videoInfo: VideoInfo | null;
}
