
import React from 'react';
import type { PromptData, Language } from '../types';
import { TagSelector } from './TagSelector';
import { CAMERA_ANGLES, CAMERA_MOVEMENTS } from '../constants';

interface InputSectionProps {
  promptData: PromptData;
  onDataChange: <K extends keyof PromptData>(key: K, value: PromptData[K]) => void;
}

const InputGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-400">{title}</label>
    {children}
  </div>
);

const StyledTextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    {...props}
    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  />
);

const StyledInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  />
);


export const InputSection: React.FC<InputSectionProps> = ({ promptData, onDataChange }) => {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onDataChange('imageFile', file);
      onDataChange('fileName', file.name);
    }
  };
  
  const languages: { key: Language; label: string }[] = [
    { key: 'Korean', label: '한국어' },
    { key: 'English', label: '영어' },
    { key: 'Japanese', label: '일본어' },
    { key: 'Mandarin', label: '대만어' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
            파일 선택
        </label>
        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
        <span className="text-gray-400">{promptData.fileName || '선택된 파일 없음'}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputGroup title="등장인물">
          <StyledTextArea
            rows={4}
            placeholder="예: [인물 A] 젊은 한국 여성, 귀여운 표정... [인물 B] 갓을 쓴 선비..."
            value={promptData.characters}
            onChange={(e) => onDataChange('characters', e.target.value)}
          />
        </InputGroup>
        <InputGroup title="행동">
          <StyledTextArea
            rows={4}
            placeholder="예: 셀카봉으로 촬영하며, 카메라를 향해 숟가락을 들어 올림"
            value={promptData.actions}
            onChange={(e) => onDataChange('actions', e.target.value)}
          />
        </InputGroup>
      </div>
      
      <InputGroup title="장면 및 배경">
        <StyledTextArea
          rows={4}
          placeholder="예: 전통적인 조선시대 주막 야외, 나무 평상에 앉아 있음"
          value={promptData.scene}
          onChange={(e) => onDataChange('scene', e.target.value)}
        />
      </InputGroup>

      <InputGroup title="대사">
        <div className="flex space-x-2 mb-2">
            {languages.map(({key, label}) => (
                <button
                    key={key}
                    onClick={() => onDataChange('language', key)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ${promptData.language === key ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600'}`}
                >
                    {label}
                </button>
            ))}
        </div>
        <StyledInput
          type="text"
          placeholder="예: [인물 A] 먹찌니 여러분 진짜 장터국밥 궁금하셨죠?"
          value={promptData.dialogue}
          onChange={(e) => onDataChange('dialogue', e.target.value)}
        />
      </InputGroup>

      <InputGroup title="사운드 디자인">
        <StyledInput
          type="text"
          placeholder="예: 활기찬 말투, 시장 배경 소음, 지글거리는 음식 소리"
          value={promptData.soundDesign}
          onChange={(e) => onDataChange('soundDesign', e.target.value)}
        />
      </InputGroup>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-400">카메라 및 앵글</h3>
        <TagSelector
          options={CAMERA_ANGLES}
          selectedOptions={promptData.angles}
          onSelectionChange={(selection) => onDataChange('angles', selection)}
          title="앵글 (여러개 선택 가능)"
        />
        <TagSelector
          options={CAMERA_MOVEMENTS}
          selectedOptions={promptData.movements}
          onSelectionChange={(selection) => onDataChange('movements', selection)}
          title="움직임 (여러개 선택 가능)"
        />
      </div>

    </div>
  );
};
