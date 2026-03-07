const MAX_FILE_SIZE = 2.5 * 1024 * 1024; // 2.5MB

export const handleFileUpload = (e, type, setUploadProgress, onImageSet, setStatus) => {
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
    onImageSet(event.target.result, type);
    setUploadProgress(prev => ({ ...prev, [type]: 100 }));
    setStatus({ type: 'success', message: 'Imagem carregada com sucesso!' });
  };
  reader.readAsDataURL(file);
};

export const generateSuggestions = () => {
  const suggestions = [
    "Foco nos detalhes do tecido, iluminação suave de estúdio.",
    "Luz natural solar, fundo minimalista de mármore.",
    "Estilo editorial de luxo, contraste nítido e elegante.",
    "Ambiente de boutique premium, cores naturais."
  ];
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};

export const downloadImage = (imageData) => {
  const link = document.createElement('a');
  link.href = imageData;
  link.download = 'zeynep-virtual-tryon.png';
  link.click();
};

// Função para traduzir de português para inglês usando API MyMemory (gratuita, sem CORS)
const translateToEnglish = async (text) => {
  if (!text || text.trim().length === 0) return '';
  
  try {
    // Detectar se é português
    if (!text.match(/[áéíóúãõç]/)) {
      // Já é inglês ou não tem caracteres especiais
      return text;
    }

    // Usar API MyMemory (gratuita, sem autenticação)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=pt|en`
    );
    
    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    
    return text; // Retorna original se falhar
  } catch (error) {
    console.warn('Erro ao traduzir:', error);
    return text; // Retorna original se falhar
  }
};

export const generateImage = async (personBase64, garmentBase64, stylePrompt, apiKey, setStatus, setResultImage) => {
  try {
    setStatus({ type: 'loading', message: 'Traduzindo prompt e gerando imagem...' });

    // Traduzir prompt para inglês se necessário
    let englishPrompt = stylePrompt ? stylePrompt.trim() : '';
    
    if (englishPrompt.length > 0) {
      englishPrompt = await translateToEnglish(englishPrompt);
    }
    
    if (!englishPrompt || englishPrompt.length === 0) {
      englishPrompt = 'A model wearing a beautiful luxury accessory. Virtual try-on fashion photography. The accessory is perfectly fitted on the model. Professional studio lighting, cinematic, high quality, 8k, trending on artstation.';
    }

    setStatus({ type: 'loading', message: 'Gerando imagem com IA...' });

    // Criar FormData (multipart/form-data é obrigatório)
    const formData = new FormData();
    formData.append('prompt', englishPrompt);
    formData.append('negative_prompt', 'blurry, low quality, distorted, text, watermark');
    formData.append('output_format', 'png');

    const response = await fetch(
      'https://api.stability.ai/v2beta/stable-image/generate/ultra',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'image/*'
        },
        body: formData
      }
    );

    console.log('Status da resposta:', response.status);
    console.log('Prompt traduzido:', englishPrompt);
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Erro JSON:', errorData);
          errorMessage = errorData.errors?.join(', ') || errorData.message || JSON.stringify(errorData);
        } else {
          const errorText = await response.text();
          console.error('Erro text:', errorText);
          errorMessage = errorText;
        }
      } catch (e) {
        console.error('Erro ao parsear resposta:', e);
      }
      
      throw new Error(`API retornou erro ${response.status}: ${errorMessage}`);
    }

    // A resposta é uma imagem PNG em binary
    const blob = await response.blob();
    const reader = new FileReader();
    
    reader.onload = () => {
      setResultImage(reader.result);
      setStatus({ type: 'success', message: 'Look Zeynep gerado com sucesso!' });
    };
    
    reader.onerror = () => {
      throw new Error('Erro ao processar imagem recebida');
    };
    
    reader.readAsDataURL(blob);
    
  } catch (error) {
    console.error('Erro completo:', error);
    setStatus({ type: 'error', message: error.message });
  }
};
