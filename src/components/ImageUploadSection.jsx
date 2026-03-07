import React, { useRef } from 'react';
import { Camera, ShoppingBag, X } from 'lucide-react';

const ImageUploadSection = ({ 
  personImage, 
  garmentImage, 
  uploadProgress, 
  onPersonImageChange, 
  onGarmentImageChange, 
  onPersonImageRemove, 
  onGarmentImageRemove 
}) => {
  const personInputRef = useRef(null);
  const garmentInputRef = useRef(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Modelo */}
      <div className="space-y-4">
        <label className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-stone-500">
          <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">01</span>
          Sua Foto
        </label>
        <div 
          onClick={() => personInputRef.current?.click()}
          className={`relative group cursor-pointer aspect-[3/4] rounded-2xl border border-stone-200 transition-all flex flex-col items-center justify-center overflow-hidden
            ${personImage ? 'bg-white shadow-xl' : 'bg-stone-100 hover:bg-white hover:border-stone-400'}`}
        >
          {personImage ? (
            <img src={personImage} alt="Modelo" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="text-center p-6">
              <Camera className="text-stone-300 w-8 h-8 mx-auto mb-3" />
              <p className="text-[11px] font-bold uppercase tracking-tighter text-stone-400">Clique para Enviar</p>
            </div>
          )}
          {uploadProgress.person > 0 && uploadProgress.person < 100 && (
            <div className="absolute bottom-0 left-0 h-1 bg-stone-900 transition-all" style={{ width: `${uploadProgress.person}%` }} />
          )}
          {personImage && (
            <button 
              onClick={(e) => { e.stopPropagation(); onPersonImageRemove(); }}
              className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full shadow-sm hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <input type="file" ref={personInputRef} className="hidden" accept="image/*" onChange={(e) => onPersonImageChange(e, personInputRef)} />
      </div>

      {/* Peça Zeynep */}
      <div className="space-y-4">
        <label className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-stone-500">
          <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">02</span>
          Peça Zeynep
        </label>
        <div 
          onClick={() => garmentInputRef.current?.click()}
          className={`relative group cursor-pointer aspect-[3/4] rounded-2xl border border-stone-200 transition-all flex flex-col items-center justify-center overflow-hidden
            ${garmentImage ? 'bg-white shadow-xl' : 'bg-stone-100 hover:bg-white hover:border-stone-400'}`}
        >
          {garmentImage ? (
            <img src={garmentImage} alt="Roupa" className="absolute inset-0 w-full h-full object-contain p-6" />
          ) : (
            <div className="text-center p-6">
              <ShoppingBag className="text-stone-300 w-8 h-8 mx-auto mb-3" />
              <p className="text-[11px] font-bold uppercase tracking-tighter text-stone-400">Escolher Produto</p>
            </div>
          )}
          {uploadProgress.garment > 0 && uploadProgress.garment < 100 && (
            <div className="absolute bottom-0 left-0 h-1 bg-stone-900 transition-all" style={{ width: `${uploadProgress.garment}%` }} />
          )}
          {garmentImage && (
            <button 
              onClick={(e) => { e.stopPropagation(); onGarmentImageRemove(); }}
              className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full shadow-sm hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <input type="file" ref={garmentInputRef} className="hidden" accept="image/*" onChange={(e) => onGarmentImageChange(e, garmentInputRef)} />
      </div>
    </div>
  );
};

export default ImageUploadSection;
