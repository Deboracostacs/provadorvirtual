import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const StylePromptSection = ({ 
  stylePrompt, 
  onStylePromptChange, 
  onGenerateSuggestions, 
  onGenerate, 
  isGenerating, 
  hasImages, 
  status 
}) => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Direção Criativa</h3>
        <button 
          onClick={onGenerateSuggestions}
          className="text-[10px] text-stone-900 font-bold flex items-center gap-1 hover:opacity-60 transition-opacity"
        >
          <Sparkles size={12} /> INSPIRAÇÃO
        </button>
      </div>
      
      <textarea 
        value={stylePrompt}
        onChange={(e) => onStylePromptChange(e.target.value)}
        placeholder="Descreva o cenário ou iluminação (ex: Luz de pôr do sol, estúdio minimalista)..."
        className="w-full bg-stone-50 border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-stone-200 outline-none transition-all resize-none h-20 placeholder:text-stone-300"
      />

      <button 
        onClick={onGenerate}
        disabled={isGenerating || !hasImages}
        className={`w-full py-5 rounded-xl font-bold text-[11px] tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-4
          ${isGenerating || !hasImages 
            ? 'bg-stone-100 text-stone-300 cursor-not-allowed' 
            : 'bg-stone-900 text-white hover:bg-black shadow-lg hover:-translate-y-0.5'}`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Processando...
          </>
        ) : (
          <>
            <Sparkles size={16} /> Experimentar Agora
          </>
        )}
      </button>

      {status.message && (
        <div className={`p-4 rounded-xl text-center text-[11px] font-bold uppercase tracking-wider
          ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-stone-100 text-stone-600'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default StylePromptSection;
