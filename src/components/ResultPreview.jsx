import React from 'react';
import { Download, Layers } from 'lucide-react';

const ResultPreview = ({ resultImage, isGenerating, onDownload }) => {
  return (
    <div className="sticky top-32">
      <div className="relative aspect-[3/4] rounded-[2.5rem] bg-stone-200 overflow-hidden shadow-2xl border-[8px] border-white group">
        {!resultImage && !isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mb-6">
              <Layers className="w-6 h-6 text-stone-300" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Aguardando Criação</p>
          </div>
        )}

        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50/90 backdrop-blur-md z-10">
            <div className="w-12 h-12 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 animate-pulse">Refinando Tecidos</p>
          </div>
        )}

        {resultImage && (
          <div className="absolute inset-0 animate-in fade-in duration-700">
            <img src={resultImage} alt="Resultado Final" className="w-full h-full object-cover" />
            <div className="absolute bottom-8 left-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              <button 
                onClick={onDownload}
                className="flex-1 bg-white py-4 rounded-xl shadow-2xl flex items-center justify-center gap-3 font-bold text-stone-900 text-[10px] tracking-widest uppercase hover:bg-stone-50 transition-colors"
              >
                <Download size={14} /> Salvar Foto
              </button>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-center text-[9px] text-stone-400 uppercase tracking-widest mt-8 px-10 leading-relaxed">
        Tecnologia de Prova Virtual Zeynep &bull; As cores podem variar de acordo com a calibração do seu monitor.
      </p>
    </div>
  );
};

export default ResultPreview;
