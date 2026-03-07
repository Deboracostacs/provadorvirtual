import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  User, 
  Sparkles, 
  RefreshCw, 
  Download, 
  X, 
  CheckCircle2, 
  Loader2,
  Camera,
  Layers,
  ShoppingBag
} from 'lucide-react';

// Chave de API injetada pelo ambiente
const apiKey = ""; 

const App = () => {
  const [personImage, setPersonImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  const [stylePrompt, setStylePrompt] = useState("");
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [resultImage, setResultImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ person: 0, garment: 0 });

  // Refs para inputs de arquivo
  const personInputRef = useRef(null);
  const garmentInputRef = useRef(null);

  // Aumentado para 2.5MB conforme solicitado (2.5 * 1024 * 1024)
  const MAX_FILE_SIZE = 2.5 * 1024 * 1024;

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setStatus({ 
        type: 'error', 
        message: 'A imagem deve ter menos de 2,5MB para garantir a estabilidade do sistema.' 
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => {
      setUploadProgress(prev => ({ ...prev, [type]: 20 }));
    };
    reader.onprogress = (data) => {
      if (data.lengthComputable) {
        const progress = Math.round((data.loaded / data.total) * 100);
        setUploadProgress(prev => ({ ...prev, [type]: progress }));
      }
    };
    reader.onload = (event) => {
      if (type === 'person') setPersonImage(event.target.result);
      else setGarmentImage(event.target.result);
      setUploadProgress(prev => ({ ...prev, [type]: 100 }));
      setStatus({ type: 'success', message: 'Imagem carregada com sucesso!' });
    };
    reader.readAsDataURL(file);
  };

  const generateSuggestions = () => {
    const suggestions = [
      "Foco nos detalhes do tecido, iluminação suave de estúdio.",
      "Luz natural solar, fundo minimalista de mármore.",
      "Estilo editorial de luxo, contraste nítido e elegante.",
      "Ambiente de boutique premium, cores naturais."
    ];
    const random = suggestions[Math.floor(Math.random() * suggestions.length)];
    setStylePrompt(random);
  };

  const handleGenerate = async () => {
    if (!personImage || !garmentImage) {
      setStatus({ type: 'error', message: 'Por favor, envie a foto da modelo e da peça Zeynep.' });
      return;
    }

    setIsGenerating(true);
    setStatus({ type: 'loading', message: 'Ajustando tecidos e iluminação fotorrealista...' });
    setResultImage(null);

    try {
      const personBase64 = personImage.split(',')[1];
      const garmentBase64 = garmentImage.split(',')[1];

      const prompt = `Advanced Virtual Try-On. Transfer the clothing/jewelry from the second image onto the person in the first image. 
      Maintain person's identity, pose, and background. Ensure perfect garment fitting and realistic shadows.
      Artistic style: ${stylePrompt || 'High-end fashion photography, 8k, realistic textures'}.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  { inlineData: { mimeType: "image/png", data: personBase64 } },
                  { inlineData: { mimeType: "image/png", data: garmentBase64 } }
                ]
              }
            ],
            generationConfig: {
              responseModalities: ['TEXT', 'IMAGE']
            }
          })
        }
      );

      if (!response.ok) throw new Error('O servidor de IA está ocupado. Tente novamente em instantes.');

      const result = await response.json();
      const generatedBase64 = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

      if (generatedBase64) {
        setResultImage(`data:image/png;base64,${generatedBase64}`);
        setStatus({ type: 'success', message: 'Look Zeynep gerado com sucesso!' });
      } else {
        throw new Error('A IA não conseguiu processar estas imagens. Tente outros ângulos.');
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsGenerating(false);
    }
  };

  const resetApp = () => {
    setPersonImage(null);
    setGarmentImage(null);
    setStylePrompt("");
    setResultImage(null);
    setStatus({ type: 'idle', message: '' });
    setUploadProgress({ person: 0, garment: 0 });
    if (personInputRef.current) personInputRef.current.value = "";
    if (garmentInputRef.current) garmentInputRef.current.value = "";
  };

  const downloadImage = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'zeynep-virtual-tryon.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5] text-stone-800 font-sans selection:bg-stone-200">
      {/* Header Zeynep */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.2em] text-stone-900 uppercase">
              Zeynep <span className="font-bold">Acessórios</span>
            </h1>
            <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-1">Virtual Fitting Experience</p>
          </div>
          <button 
            onClick={resetApp}
            className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-500"
            title="Reiniciar"
          >
            <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Configuração */}
          <div className="lg:col-span-7 space-y-10">
            
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
                      onClick={(e) => { e.stopPropagation(); setPersonImage(null); }}
                      className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full shadow-sm hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input type="file" ref={personInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'person')} />
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
                      onClick={(e) => { e.stopPropagation(); setGarmentImage(null); }}
                      className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full shadow-sm hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input type="file" ref={garmentInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'garment')} />
              </div>
            </div>

            {/* Ação */}
            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Direção Criativa</h3>
                <button 
                  onClick={generateSuggestions}
                  className="text-[10px] text-stone-900 font-bold flex items-center gap-1 hover:opacity-60 transition-opacity"
                >
                  <Sparkles size={12} /> INSPIRAÇÃO
                </button>
              </div>
              
              <textarea 
                value={stylePrompt}
                onChange={(e) => setStylePrompt(e.target.value)}
                placeholder="Descreva o cenário ou iluminação (ex: Luz de pôr do sol, estúdio minimalista)..."
                className="w-full bg-stone-50 border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-stone-200 outline-none transition-all resize-none h-20 placeholder:text-stone-300"
              />

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !personImage || !garmentImage}
                className={`w-full py-5 rounded-xl font-bold text-[11px] tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-4
                  ${isGenerating || !personImage || !garmentImage 
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
          </div>

          {/* Coluna de Resultado */}
          <div className="lg:col-span-5">
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
                        onClick={downloadImage}
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
          </div>
        </div>
      </main>

      <footer className="py-20 text-center border-t border-stone-200 mt-20 bg-white">
        <p className="text-[10px] font-black tracking-[0.4em] text-stone-300 uppercase">
          Zeynep &copy; 2024 &bull; Luxury Virtual Experience
        </p>
      </footer>
    </div>
  );
};

export default App;
