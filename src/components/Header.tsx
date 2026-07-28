import React from 'react';

interface HeaderProps {
  credits?: number;
  onOpenVercelGuide?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="w-full bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8 mb-6 shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Branding Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
            {/* Custom Logo icon: quadrant studio mark */}
            <div className="w-4 h-4 border-2 border-white rounded-xs relative flex items-start justify-start p-0.5">
              <div className="w-1.5 h-1.5 bg-white rounded-2xs"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-none">
                Prompt Studio Banner
              </h1>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded font-medium">
                v1.3
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide mt-1">
              By Jeres Studio
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

