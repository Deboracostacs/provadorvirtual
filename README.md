# Zeynep Virtual Try-On

Aplicação React para provador virtual de acessórios. Sobrepõe acessórios em uma modelo utilizando inteligência artificial (Google Gemini).

## 🚀 Funcionalidades

- Upload de imagem da modelo
- Upload de imagem do acessório
- Geração de imagem com sobreposição realista
- Sugestões de direção criativa
- Download da imagem gerada
- Interface responsiva e moderna

## 📋 Requisitos

- Node.js 16+
- npm ou yarn
- Chave de API do Google Gemini

## 🔧 Instalação

1. Clone o repositório
```bash
git clone <seu-repositorio>
cd provadorvirtual
```

2. Instale as dependências
```bash
npm install
```

3. Configure a chave de API
```bash
cp .env.example .env.local
# Edite .env.local e adicione sua chave do Google Gemini
```

## 🏃 Desenvolvimento

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação será aberta automaticamente em `http://localhost:3000`

## 🏗️ Build

Para gerar a build de produção:
```bash
npm run build
```

Para visualizar a build:
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Header.jsx              # Cabeçalho da aplicação
│   ├── Footer.jsx              # Rodapé da aplicação
│   ├── ImageUploadSection.jsx   # Seção de upload de imagens
│   ├── StylePromptSection.jsx   # Seção de direção criativa
│   └── ResultPreview.jsx        # Pré-visualização do resultado
├── utils/
│   └── imageUtils.js            # Funções utilitárias para processamento de imagens
├── App.jsx                       # Componente principal
├── main.jsx                      # Ponto de entrada
└── index.css                     # Estilos globais

public/
└── index.html                    # HTML principal
```

## 🎨 Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Ícones
- **Google Gemini API** - IA para geração de imagens

## 📝 Componentes

### Header
Cabeçalho com logo da marca Zeynep e botão de reiniciar a aplicação.

### ImageUploadSection
Permite upload de duas imagens:
- Foto da modelo
- Peça de acessório

Inclui barra de progresso do upload.

### StylePromptSection
Campo para inserir direção criativa/estilo desejado com:
- Campo de texto para digite
- Botão para gerar sugestões aleatórias
- Botão para gerar a imagem

### ResultPreview
Exibe a imagem gerada e permite download.

## 🔐 Variáveis de Ambiente

```
VITE_STABILITY_API_KEY=sua_chave_api_stability_aqui
```

### Como obter a chave:

1. Acesse https://platform.stability.ai
2. Faça login ou crie uma conta
3. Vá em "API Keys" no menu
4. Clique em "Create new key"
5. Copie a chave e cole no arquivo `.env.local`

> ⚠️ **Importante:**
> - A primeira conta tem créditos gratuitos para testar
> - Nunca compartilhe sua chave
> - Adicione a chave em `.env.local` (não em `.env.example`)

## 🐛 Troubleshooting

### Erro: "Chave de API não configurada"
- Verifique se o arquivo `.env.local` existe
- Certifique-se de que `VITE_GEMINI_API_KEY` está configurado

### Erro: "O servidor de IA está ocupado"
- Aguarde alguns momentos e tente novamente
- Verifique sua conexão com a internet

### Imagens não são processadas
- Certifique-se de que as imagens têm menos de 2.5MB
- Tente imagens em formatos suportados (PNG, JPG)

## 📄 Licença

Este projeto está sob licença MIT.

## 👤 Autor

Zeynep Acessórios - Luxury Virtual Experience

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.
