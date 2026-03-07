import React from 'react';
import { RefreshCw } from 'lucide-react';

const Header = ({ onReset, isGenerating }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-stone-900 uppercase">
            Zeynep <span className="font-bold">Acessórios</span>
          </h1>
          <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-1">Virtual Fitting Experience</p>
        </div>
        <button 
          onClick={onReset}
          className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-500"
          title="Reiniciar"
        >
          <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;
