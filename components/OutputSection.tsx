
import React, { useState } from 'react';
import { MagicWandIcon, CopyIcon, CheckIcon } from './Icon';

interface OutputSectionProps {
  onGenerate: () => void;
  generatedPrompt: string;
  isLoading: boolean;
  error: string | null;
}

const OutputCard: React.FC<{ title: string, number: number, children: React.ReactNode, actions?: React.ReactNode }> = ({ title, number, children, actions }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
    <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">
            <span className="text-gray-400">{number}.</span> {title}
        </h2>
        {actions}
    </div>
    {children}
  </div>
);

export const OutputSection: React.FC<OutputSectionProps> = ({ onGenerate, generatedPrompt, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 sticky top-8">
      <OutputCard title="AI로 생성하기" number={2}>
        <p className="text-gray-400 text-sm">
          입력한 내용을 바탕으로 Gemini가 더 상세하고 강화된 프롬프트를 생성합니다.
        </p>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-200 disabled:bg-blue-800 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              생성 중...
            </>
          ) : (
            <>
              <MagicWandIcon className="w-5 h-5" />
              프롬프트 향상
            </>
          )}
        </button>
      </OutputCard>

      <OutputCard 
        title="최종 프롬프트" 
        number={3}
        actions={
            <button onClick={handleCopy} className="text-gray-400 hover:text-white transition duration-200 flex items-center gap-2 text-sm">
                {copied ? <CheckIcon className="w-4 h-4 text-green-400"/> : <CopyIcon className="w-4 h-4"/>}
                {copied ? '복사됨' : '복사'}
            </button>
        }
      >
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="w-full min-h-[150px] bg-slate-900/70 rounded-lg p-4 text-gray-300 text-sm whitespace-pre-wrap font-mono">
            {generatedPrompt || 'AI가 생성한 프롬프트가 여기에 표시됩니다.'}
        </div>
      </OutputCard>
    </div>
  );
};
