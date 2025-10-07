
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import type { PromptData } from './types';
import { generateVideoPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [promptData, setPromptData] = useState<PromptData>({
    imageFile: null,
    fileName: '',
    characters: '',
    actions: '',
    scene: '',
    dialogue: '',
    language: 'Korean',
    soundDesign: '',
    angles: [],
    movements: [],
  });

  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDataChange = useCallback(<K extends keyof PromptData>(key: K, value: PromptData[K]) => {
    setPromptData(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleGeneratePrompt = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');
    try {
      const result = await generateVideoPrompt(promptData);
      setGeneratedPrompt(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <InputSection promptData={promptData} onDataChange={handleDataChange} />
          </div>
          <div className="lg:col-span-2">
            <OutputSection
              onGenerate={handleGeneratePrompt}
              generatedPrompt={generatedPrompt}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
