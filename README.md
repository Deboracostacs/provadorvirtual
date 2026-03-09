<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zeynep Acessórios — Provador Virtual</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #fdfbfb;
        }
        .font-serif {
            font-family: 'Playfair Display', serif;
        }
        .drop-zone {
            transition: all 0.3s ease;
            border: 2px dashed #e5e7eb;
        }
        .drop-zone:hover, .drop-zone.dragover {
            border-color: #d4af37;
            background-color: #fffaf0;
        }
        .gold-button {
            background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .gold-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(184, 134, 11, 0.3);
        }
        .loader-bar {
            width: 0%;
            transition: width 0.4s ease;
        }
        .image-preview {
            max-height: 300px;
            object-fit: contain;
        }
    </style>
</head>
<body class="text-gray-800">

    <div class="max-w-[1100px] mx-auto px-4 py-12">
        <!-- Header -->
        <header class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-serif text-[#b8860b] mb-4">Zeynep Acessórios</h1>
            <p class="text-xl text-gray-600 font-light">Provador Virtual</p>
            <div class="w-24 h-1 bg-[#d4af37] mx-auto mt-4 rounded-full"></div>
            <p class="mt-6 text-gray-500 max-w-lg mx-auto">
                Experimente acessórios virtualmente usando inteligência artificial avançada. 
                Sinta a elegância antes mesmo de comprar.
            </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Etapa 1: Modelo -->
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div class="flex items-center mb-4">
                    <span class="w-8 h-8 rounded-full bg-[#fef2f2] text-[#d4af37] flex items-center justify-center font-bold mr-3">1</span>
                    <h2 class="text-lg font-semibold">Foto da Modelo</h2>
                </div>
                <div id="model-drop-zone" class="drop-zone rounded-xl p-8 text-center cursor-pointer relative overflow-hidden h-64 flex flex-col justify-center items-center">
                    <input type="file" id="model-input" class="hidden" accept="image/*">
                    <div id="model-placeholder">
                        <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        <p class="text-sm text-gray-500">Arraste ou selecione a foto da modelo</p>
                        <p class="text-xs text-gray-400 mt-2">JPG, PNG ou WEBP</p>
                    </div>
                    <img id="model-preview" class="hidden image-preview rounded-lg">
                    <button id="remove-model" class="hidden absolute top-2 right-2 bg-red-50 text-red-500 p-1 rounded-full hover:bg-red-100">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
            </div>

            <!-- Etapa 2: Acessório -->
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div class="flex items-center mb-4">
                    <span class="w-8 h-8 rounded-full bg-[#fef2f2] text-[#d4af37] flex items-center justify-center font-bold mr-3">2</span>
                    <h2 class="text-lg font-semibold">Upload do Acessório</h2>
                </div>
                <div id="accessory-drop-zone" class="drop-zone rounded-xl p-8 text-center cursor-pointer relative overflow-hidden h-64 flex flex-col justify-center items-center">
                    <input type="file" id="accessory-input" class="hidden" accept="image/*">
                    <div id="accessory-placeholder">
                        <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        <p class="text-sm text-gray-500">Arraste ou selecione o acessório</p>
                        <p class="text-xs text-gray-400 mt-2">Fundo transparente recomendado</p>
                    </div>
                    <img id="accessory-preview" class="hidden image-preview rounded-lg">
                    <button id="remove-accessory" class="hidden absolute top-2 right-2 bg-red-50 text-red-500 p-1 rounded-full hover:bg-red-100">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div class="mt-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de acessório:</label>
                    <select id="accessory-type" class="w-full border-gray-200 border rounded-lg p-2.5 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all">
                        <option value="brinco">Brinco</option>
                        <option value="colar">Colar</option>
                        <option value="anel">Anel</option>
                        <option value="pulseira">Pulseira</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Etapa 3: Estilo de Aplicação -->
        <div class="mt-8 bg-[#fffafb] p-6 rounded-2xl border border-pink-50">
            <h3 class="text-md font-semibold text-gray-700 mb-3 flex items-center">
                <svg class="w-5 h-5 mr-2 text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                Diretrizes de IA:
            </h3>
            <p id="style-description" class="text-sm text-gray-600 leading-relaxed italic">
                Aplicar brinco no lóbulo da orelha com encaixe anatômico correto, alinhado com a perspectiva da cabeça, escala proporcional ao rosto e leve sombra de contato com a pele.
            </p>
        </div>

        <!-- Ações -->
        <div class="mt-12 flex flex-col md:flex-row gap-4 justify-center">
            <button id="btn-generate" class="gold-button text-white px-10 py-4 rounded-full font-semibold text-lg flex items-center justify-center">
                <span>Gerar Provador Virtual</span>
            </button>
            <button id="btn-reset" class="bg-gray-100 text-gray-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors">
                Resetar imagens
            </button>
        </div>

        <!-- Status -->
        <div id="status-container" class="hidden mt-12 max-w-xl mx-auto text-center">
            <p id="status-text" class="text-sm font-medium text-gray-600 mb-4">Iniciando processamento...</p>
            <div class="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                <div id="progress-bar" class="loader-bar h-full bg-[#d4af37]"></div>
            </div>
        </div>

        <!-- Resultado -->
        <div id="result-container" class="hidden mt-16 animate-fadeIn">
            <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-3xl mx-auto">
                <h2 class="text-2xl font-serif text-center mb-8">Resultado do Provador Virtual</h2>
                <div class="relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                    <img id="final-result" src="" alt="Resultado Final" class="w-full h-auto min-h-[400px] object-contain">
                    <div id="loading-overlay" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center hidden">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
                    </div>
                </div>
                <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button id="btn-download" class="border-2 border-[#d4af37] text-[#d4af37] px-8 py-3 rounded-full font-medium hover:bg-[#fffaf0] transition-all flex items-center justify-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Download da imagem
                    </button>
                    <button id="btn-new-variation" class="bg-gray-800 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition-all">
                        Gerar nova variação
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal Error -->
        <div id="error-modal" class="fixed inset-0 bg-black/50 hidden flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
                <div class="text-red-500 mb-4">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="text-xl font-bold mb-2">Ops!</h3>
                <p id="error-message" class="text-gray-600 mb-6">Por favor, envie as duas imagens antes de continuar.</p>
                <button onclick="document.getElementById('error-modal').classList.add('hidden')" class="w-full bg-gray-800 text-white py-3 rounded-xl">Entendido</button>
            </div>
        </div>
    </div>

    <script>
        const apiKey = ""; // API Key automática via ambiente

        // UI Elements
        const modelInput = document.getElementById('model-input');
        const accessoryInput = document.getElementById('accessory-input');
        const modelDropZone = document.getElementById('model-drop-zone');
        const accessoryDropZone = document.getElementById('accessory-drop-zone');
        const accessoryType = document.getElementById('accessory-type');
        const styleDescription = document.getElementById('style-description');
        const btnGenerate = document.getElementById('btn-generate');
        const btnReset = document.getElementById('btn-reset');
        const statusContainer = document.getElementById('status-container');
        const statusText = document.getElementById('status-text');
        const progressBar = document.getElementById('progress-bar');
        const resultContainer = document.getElementById('result-container');
        const finalResultImg = document.getElementById('final-result');
        const btnDownload = document.getElementById('btn-download');

        let modelData = null;
        let accessoryData = null;

        // Estilos baseados no tipo
        const styles = {
            brinco: "Aplicar brinco no lóbulo da orelha com encaixe anatômico correto, alinhado com a perspectiva da cabeça, escala proporcional ao rosto e leve sombra de contato com a pele.",
            colar: "Aplicar colar ao redor do pescoço seguindo a curvatura natural, com pingente centralizado no colo e sombra suave de contato entre corrente e pele.",
            anel: "Aplicar anel em um dedo visível da mão com proporção realista e alinhamento correto com a perspectiva da mão.",
            pulseira: "Aplicar pulseira no pulso visível respeitando orientação do braço e escala realista."
        };

        accessoryType.addEventListener('change', (e) => {
            styleDescription.innerText = styles[e.target.value];
        });

        // Drag & Drop logic
        function setupUpload(input, dropZone, preview, placeholder, removeBtn, storeKey) {
            dropZone.addEventListener('click', () => input.click());
            
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });

            dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                handleFiles(e.dataTransfer.files[0], preview, placeholder, removeBtn, storeKey);
            });

            input.addEventListener('change', (e) => {
                handleFiles(e.target.files[0], preview, placeholder, removeBtn, storeKey);
            });

            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                preview.src = "";
                preview.classList.add('hidden');
                placeholder.classList.remove('hidden');
                removeBtn.classList.add('hidden');
                if(storeKey === 'model') modelData = null;
                else accessoryData = null;
            });
        }

        function handleFiles(file, preview, placeholder, removeBtn, storeKey) {
            if (!file || !file.type.startsWith('image/')) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
                placeholder.classList.add('hidden');
                removeBtn.classList.remove('hidden');
                
                // Salva o base64 sem o prefixo data:image/xxx;base64,
                const base64 = e.target.result.split(',')[1];
                if(storeKey === 'model') modelData = base64;
                else accessoryData = base64;
            };
            reader.readAsDataURL(file);
        }

        setupUpload(modelInput, modelDropZone, document.getElementById('model-preview'), document.getElementById('model-placeholder'), document.getElementById('remove-model'), 'model');
        setupUpload(accessoryInput, accessoryDropZone, document.getElementById('accessory-preview'), document.getElementById('accessory-placeholder'), document.getElementById('remove-accessory'), 'accessory');

        // Lógica de Geração
        async function gerarProvadorVirtual() {
            if (!modelData || !accessoryData) {
                document.getElementById('error-modal').classList.remove('hidden');
                return;
            }

            // UI Feedback
            statusContainer.classList.remove('hidden');
            resultContainer.classList.add('hidden');
            btnGenerate.disabled = true;
            btnGenerate.classList.add('opacity-50', 'cursor-not-allowed');

            const updateProgress = (text, percent) => {
                statusText.innerText = text;
                progressBar.style.width = percent + '%';
            };

            try {
                updateProgress("Carregando imagens...", 10);
                await new Promise(r => setTimeout(r, 800));
                
                updateProgress("Processando modelo...", 30);
                await new Promise(r => setTimeout(r, 1200));

                updateProgress("Posicionando acessório anatomicamente...", 60);
                
                const prompt = `Gere uma imagem fotorrealista de alta qualidade da modelo fornecida usando o acessório enviado.
                Tipo de acessório: ${accessoryType.value}.
                Regras: ${styles[accessoryType.value]}.
                A iluminação do acessório deve corresponder perfeitamente à iluminação da cena da modelo.
                Mantenha a identidade facial e as características da modelo original.
                O resultado deve parecer uma fotografia profissional de moda.`;

                // Chamada para Gemini Flash 2.5 Image Preview (Simulando o Image-to-Image conforme o contrato)
                const response = await callImageEditingAPI(prompt, modelData, accessoryData);
                
                updateProgress("Gerando resultado final...", 90);
                
                if (response) {
                    finalResultImg.src = `data:image/png;base64,${response}`;
                    updateProgress("Pronto!", 100);
                    setTimeout(() => {
                        statusContainer.classList.add('hidden');
                        resultContainer.classList.remove('hidden');
                        btnGenerate.disabled = false;
                        btnGenerate.classList.remove('opacity-50', 'cursor-not-allowed');
                        window.scrollTo({ top: resultContainer.offsetTop - 50, behavior: 'smooth' });
                    }, 500);
                }

            } catch (error) {
                console.error(error);
                statusText.innerText = "Erro ao processar. Tente novamente.";
                btnGenerate.disabled = false;
                btnGenerate.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        async function callImageEditingAPI(prompt, modelBase64, accessoryBase64) {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
            
            const payload = {
                contents: [{
                    parts: [
                        { text: prompt },
                        { inlineData: { mimeType: "image/png", data: modelBase64 } },
                        { inlineData: { mimeType: "image/png", data: accessoryBase64 } }
                    ]
                }],
                generationConfig: {
                    responseModalities: ["TEXT", "IMAGE"]
                }
            };

            let retries = 5;
            let delay = 1000;

            while (retries > 0) {
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    
                    if (!response.ok) throw new Error('API Error');
                    
                    const result = await response.json();
                    const base64Image = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
                    
                    if (base64Image) return base64Image;
                    throw new Error('No image in response');
                } catch (e) {
                    retries--;
                    if (retries === 0) throw e;
                    await new Promise(r => setTimeout(r, delay));
                    delay *= 2;
                }
            }
        }

        btnGenerate.addEventListener('click', gerarProvadorVirtual);

        btnReset.addEventListener('click', () => {
            document.getElementById('remove-model').click();
            document.getElementById('remove-accessory').click();
            resultContainer.classList.add('hidden');
            statusContainer.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('btn-new-variation').addEventListener('click', gerarProvadorVirtual);

        btnDownload.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = finalResultImg.src;
            link.download = `zeynep-provador-${Date.now()}.png`;
            link.click();
        });

    </script>
</body>
</html>
