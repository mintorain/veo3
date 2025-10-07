
export type Language = 'Korean' | 'English' | 'Japanese' | 'Mandarin';

export interface PromptData {
  imageFile: File | null;
  fileName: string;
  characters: string;
  actions: string;
  scene: string;
  dialogue: string;
  language: Language;
  soundDesign: string;
  angles: string[];
  movements: string[];
}
