import { create } from "zustand";

// Define types for each training method
interface QAPair {
  question: string;
  answer: string;
}

interface AppState {
  // File training state
  files: File[];
  addFiles: (newFiles: File[]) => void;
  removeFile: (index: number) => void;

  // Text training state
  trainingText: string;
  setTrainingText: (text: string) => void;

  // Website training state
  urls: string[];
  addUrl: (url: string) => void;
  removeUrl: (index: number) => void;

  // Q&A training state
  qaPairs: QAPair[];
  addQAPair: (pair: QAPair) => void;
  removeQAPair: (index: number) => void;
}

const useAppStore = create<AppState>((set) => ({
  // File training state
  files: [],
  addFiles: (newFiles) =>
    set((state) => ({
      files: [...state.files, ...newFiles],
    })),
  removeFile: (index) =>
    set((state) => ({
      files: state.files.filter((_, i) => i !== index),
    })),

  // Text training state
  trainingText: "",
  setTrainingText: (text) => set({ trainingText: text }),

  // Website training state
  urls: [],
  addUrl: (url) =>
    set((state) => ({
      urls: [...state.urls, url],
    })),
  removeUrl: (index) =>
    set((state) => ({
      urls: state.urls.filter((_, i) => i !== index),
    })),

  // Q&A training state
  qaPairs: [],
  addQAPair: (pair) =>
    set((state) => ({
      qaPairs: [...state.qaPairs, pair],
    })),
  removeQAPair: (index) =>
    set((state) => ({
      qaPairs: state.qaPairs.filter((_, i) => i !== index),
    })),
}));

export default useAppStore;
