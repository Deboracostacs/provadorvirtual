import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploadSection from './components/ImageUploadSection';
import StylePromptSection from './components/StylePromptSection';
import ResultPreview from './components/ResultPreview';
import { 
  handleFileUpload, 
  generateSuggestions, 
  downloadImage, 
  generateImage 
} from './utils/imageUtils';

// Adicione sua chave de API Stability.ai aqui ou configure via variável de ambiente
const apiKey = import.meta.env.VITE_STABILITY_API_KEY || "";

const App = () => {
  const [personImage, setPersonImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  const [stylePrompt, setStylePrompt] = useState("");
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [resultImage, setResultImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ person: 0, garment: 0 });

  const handleImageUpload = (e, type, ref) => {
    handleFileUpload(e, type, setUploadProgress, (image, imageType) => {
      if (imageType === 'person') {
        setPersonImage(image);
      } else {
        setGarmentImage(image);
      }
    }, setStatus);
  };

  const handlePersonImageChange = (e, ref) => {
    handleImageUpload(e, 'person', ref);
  };

  const handleGarmentImageChange = (e, ref) => {
    handleImageUpload(e, 'garment', ref);
  };

  const handlePersonImageRemove = () => {
    setPersonImage(null);
    setUploadProgress(prev => ({ ...prev, person: 0 }));
  };

  const handleGarmentImageRemove = () => {
    setGarmentImage(null);
    setUploadProgress(prev => ({ ...prev, garment: 0 }));
  };

  const handleGenerateSuggestions = () => {
    const suggestion = generateSuggestions();
    setStylePrompt(suggestion);
  };

  const handleGenerate = async () => {
    if (!personImage || !garmentImage) {
      setStatus({ type: 'error', message: 'Por favor, envie a foto da modelo e da peça Zeynep.' });
      return;
    }

    if (!apiKey) {
      setStatus({ type: 'error', message: 'Chave de API Stability.ai não configurada. Configure a variável VITE_STABILITY_API_KEY.' });
      return;
    }

    setIsGenerating(true);
    setStatus({ type: 'loading', message: 'Ajustando tecidos e iluminação fotorrealista...' });
    setResultImage(null);

    try {
      const personBase64 = personImage.split(',')[1];
      const garmentBase64 = garmentImage.split(',')[1];

      await generateImage(personBase64, garmentBase64, stylePrompt, apiKey, setStatus, setResultImage);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setPersonImage(null);
    setGarmentImage(null);
    setStylePrompt("");
    setResultImage(null);
    setStatus({ type: 'idle', message: '' });
    setUploadProgress({ person: 0, garment: 0 });
  };

  const handleDownload = () => {
    if (resultImage) {
      downloadImage(resultImage);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5] text-stone-800 font-sans selection:bg-stone-200">
      <Header onReset={handleReset} isGenerating={isGenerating} />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Configuração */}
          <div className="lg:col-span-7 space-y-10">
            
            <ImageUploadSection
              personImage={personImage}
              garmentImage={garmentImage}
              uploadProgress={uploadProgress}
              onPersonImageChange={handlePersonImageChange}
              onGarmentImageChange={handleGarmentImageChange}
              onPersonImageRemove={handlePersonImageRemove}
              onGarmentImageRemove={handleGarmentImageRemove}
            />

            <StylePromptSection
              stylePrompt={stylePrompt}
              onStylePromptChange={setStylePrompt}
              onGenerateSuggestions={handleGenerateSuggestions}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              hasImages={!!personImage && !!garmentImage}
              status={status}
            />
          </div>

          {/* Coluna de Resultado */}
          <div className="lg:col-span-5">
            <ResultPreview
              resultImage={resultImage}
              isGenerating={isGenerating}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
