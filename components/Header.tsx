
import React from 'react';
import { CameraIcon } from './Icon';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center gap-4">
      <div className="bg-blue-600 p-3 rounded-lg">
        <CameraIcon className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-white tracking-tight">
        VEO3 AI 프롬프트 생성기
      </h1>
    </header>
  );
};
