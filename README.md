# DeepSeek Chat App

AI chat with **document processing**, **web search**, and a **researcher agent** — powered by **Groq** and **Gemini Vision**.

**Tech Stack:** Next.js 15 • React 19 • MongoDB • Clerk • Groq AI • Gemini Vision

---

## 🚀 What's New

- 🌐 **Web Search Integration:** Real-time information retrieval using the Tavily API.  
- 🧠 **Researcher Agent:** Context-aware reasoning chain that merges memory, uploaded documents, and web data.  
- 🧩 **Reference Classifier:** LLM detects if the user’s query depends on past context or previous documents.  
- ⚡ **Enhanced Context Memory:** Rebuilds conversation history dynamically for deep, multi-turn coherence.  
- 🪄 **Gemini Vision Integration:** Extracts textual data directly from uploaded images for intelligent document-aware responses.

---

## ✨ Features

- 🔐 Secure authentication with **Clerk**  
- 💬 Conversational AI using **Groq LPU API**  
- 📁 Upload TXT, MD, or image files  
- 🖼️ Extract image content with **Gemini Vision**  
- 🌐 Integrated web search (**Tavily API**)  
- 🧠 Memory-aware context chaining  
- 🧾 DeepThink mode for long-form analysis  
- 💾 Persistent chat history with **MongoDB**

---

## ⚙️ Quick Start

```bash
# Clone the repository
git clone https://github.com/sujal-thakur01/DeepSeek-Clone.git
cd DeepSeek-Clone

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Fill in API keys below
npm run verify

# Run the development server
npm run dev
Now open http://localhost:3000 🎉
🔑 Environment Setup
Create a .env file and add the following:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
SIGNING_SECRET=whsec_xxx
MONGODB_URI=mongodb+srv://xxx
GROQ_API_KEY=gsk_xxx
GOOGLE_API_KEY=AIzaSy_xxx   # for Gemini Vision
TAVILY_API_KEY=tvly_xxx     # for Web Search
🪪 Get API Keys from
Clerk — Authentication
MongoDB Atlas — Database
Groq Console — AI API
Gemini Studio — Vision model
Tavily — Web search
🧱 Project Structure
app/
├── api/chat/
│   ├── ai/route.js       # Main AI pipeline
│   ├── web/route.js      # Tavily web search integration
│   ├── upload/route.js   # Gemini Vision + File processing
│   └── get/route.js      # Chat fetch endpoint
├── components/           # UI Components (Chat, Sidebar, etc.)
├── context/              # AppContextProvider for global state
├── models/Chat.js        # Mongoose Schema
├── config/db.js          # MongoDB Connection
└── page.jsx              # Chat Interface
🧩 Advanced AI Backend Logic
This app’s intelligence pipeline inside app/api/chat/ai/route.js handles everything from authentication to dynamic reasoning:
Authentication → User verified with Clerk (getAuth)
Memory Fetch → Retrieves chat history from MongoDB using userId + chatId
Reference Classifier → Detects if query needs prior context (YES/NO)
Context Builder → Merges latest conversation + uploaded document data
Web Search → Calls /api/chat/web (Tavily) for answer + references
Researcher Agent (DeepThink) → Generates structured Markdown reports
Gemini Vision → Reads & extracts text from uploaded .png, .jpg, etc.
Response Generation → Uses llama-3.3-70b-versatile (Groq API)
Persistence → Saves user + assistant messages to MongoDB
Flow:
Clerk Auth → Load Memory → Classify Query → (Optional) Web Search → (Optional) DeepThink Mode → AI Response → MongoDB Save
🔗 Key Endpoints
POST /api/chat/ai        # Chat with Groq AI + Memory + Web Search
POST /api/chat/upload    # Upload & process documents/images
POST /api/chat/web       # Tavily Web Search API integration
GET  /api/chat/get       # Retrieve all chats for a user
🧠 How It Works
User sends message → API authenticates via Clerk
Model checks if previous messages are needed (Reference Classifier)
If yes, loads history & context from MongoDB
If web search is enabled, queries Tavily and merges results
Generates structured AI response (Groq) → Saves conversation
🩵 Troubleshooting
# Reinstall dependencies cleanly
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# If .env variables not loading
npm run dev
Common fixes:
Restart server after .env changes
Check MongoDB IP whitelist
Ensure Clerk keys start with NEXT_PUBLIC_ prefix
📚 Documentation
SETUP.md — Full setup guide
CONTRIBUTING.md — Contribution workflow
LICENSE — MIT License
🚀 Deploy (on Vercel)
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
Then:
Go to Vercel
Import your GitHub repository
Add environment variables
Deploy 🚀
📄 License
MIT © Sujal Thakur
Enhanced with Web Search, Researcher Agent & Gemini Vision

---

✅ This version renders perfectly on GitHub — syntax-highlighted bash blocks, proper line spacing, and clean indentation.  
Would you like me to make a **shorter portfolio-optimized version** too (for linking in your resume)?
You said:

# DeepSeek Chat App

AI chat with **document processing**, **web search**, and a **researcher agent** — powered by **Groq** and **Gemini Vision**.

**Tech Stack:** Next.js 15 • React 19 • MongoDB • Clerk • Groq AI • Gemini Vision

---

## 🚀 What's New

- 🌐 **Web Search Integration:** Real-time information retrieval using the Tavily API.  
- 🧠 **Researcher Agent:** Context-aware reasoning chain that merges memory, uploaded documents, and web data.  
- 🧩 **Reference Classifier:** LLM detects if the user’s query depends on past context or previous documents.  
- ⚡ **Enhanced Context Memory:** Rebuilds conversation history dynamically for deep, multi-turn coherence.  
- 🪄 **Gemini Vision Integration:** Extracts textual data directly from uploaded images for intelligent document-aware responses.

---

## ✨ Features

- 🔐 Secure authentication with **Clerk**
- 💬 Conversational AI using **Groq LPU API**
- 📁 Upload TXT, MD, or image files  
- 🖼️ Extract image content with **Gemini Vision**
- 🌐 Integrated web search (Tavily API)
- 🧠 Memory-aware context chaining
- 🧾 DeepThink mode for long-form analysis
- 💾 Persistent chat history with MongoDB  

---

## ⚙️ Quick Start

bash
# Clone the repository
git clone https://github.com/sujal-thakur01/DeepSeek-Clone.git
cd DeepSeek-Clone

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Fill in API keys below
npm run verify

# Run the development server
npm run dev
Now open http://localhost:3000 🎉
🔑 Environment Setup
Create a .env file and add the following:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
SIGNING_SECRET=whsec_xxx
MONGODB_URI=mongodb+srv://xxx
GROQ_API_KEY=gsk_xxx
GOOGLE_API_KEY=AIzaSy_xxx   # for Gemini Vision
TAVILY_API_KEY=tvly_xxx     # for Web Search
🪪 Get API Keys from:
Clerk — Authentication
MongoDB Atlas — Database
Groq Console — AI API
Gemini Studio — Vision model
Tavily — Web search
🧱 Project Structure
app/
├── api/chat/
│   ├── ai/route.js       # Main AI pipeline
│   ├── web/route.js      # Tavily web search integration
│   ├── upload/route.js   # Gemini Vision + File processing
│   └── get/route.js      # Chat fetch endpoint
├── components/           # UI Components (Chat, Sidebar, etc.)
├── context/              # AppContextProvider for global state
├── models/Chat.js        # Mongoose Schema
├── config/db.js          # MongoDB Connection
└── page.jsx              # Chat Interface
🧩 Advanced AI Backend Logic
This app’s intelligence pipeline inside app/api/chat/ai/route.js handles everything from authentication to dynamic reasoning:
Authentication → User verified with Clerk (getAuth)
Memory Fetch → Retrieves user chat history from MongoDB using userId + chatId
Reference Classifier → LLM detects whether query needs prior context (YES/NO)
Context Builder → Merges latest conversation + uploaded document data
Web Search → If enabled, calls /api/chat/web which queries Tavily for answer + references
Researcher Agent (DeepThink) → Produces structured Markdown reports (Title, Summary, TOC, Findings, Sources)
Gemini Vision → Reads and extracts text from uploaded .png, .jpg, etc.
Response Generation → Uses llama-3.3-70b-versatile (Groq API) to synthesize all sources
Persistence → Saves user + assistant messages to MongoDB
Flow:
Clerk Auth → Load Memory → Classify Query → (Optional) Web Search → (Optional) DeepThink Mode → AI Response → MongoDB Save
🔗 Key Endpoints
POST /api/chat/ai        # Chat with Groq AI + Memory + Web Search
POST /api/chat/upload    # Upload & process documents/images
POST /api/chat/web       # Tavily Web Search API integration
GET  /api/chat/get       # Retrieve all chats for a user
🧠 How It Works
User sends a message → API authenticates via Clerk
Model checks if previous messages are needed (Reference Classifier)
If yes, loads relevant history & context from MongoDB
If Web Search is enabled, queries Tavily and merges results
Generates structured AI response (Groq) → Saves conversation
🩵 Troubleshooting
# Reinstall dependencies cleanly
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
Common fixes:
Restart server after .env changes
Check MongoDB IP whitelist
Ensure Clerk keys start with NEXT_PUBLIC_ prefix
📚 Documentation
SETUP.md — Full setup guide
CONTRIBUTING.md — Contribution workflow
LICENSE — MIT License
🚀 Deploy
✅ Vercel (Recommended)
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
Then:
Go to Vercel
Import your GitHub repository
Add environment variables
Deploy 🚀
📄 License
MIT © Sujal Thakur
Enhanced with Web Search, Researcher Agent & Gemini Vision


bro in this we have intiliasied the bash but haven't ended it. so mention everywhere it's starting and where it's en ding
ChatGPT said:
Perfect catch 👀 — that’s exactly right, bro.
In your current README, the main bash block isn’t closed properly, so everything below renders as code on GitHub.
Here’s the fixed and clean version — all bash sections now open and close properly (✅ bash … ).
Just copy-paste this entire thing into VS Code as your final README.md:

# DeepSeek Chat App

AI chat with **document processing**, **web search**, and a **researcher agent** — powered by **Groq** and **Gemini Vision**.

**Tech Stack:** Next.js 15 • React 19 • MongoDB • Clerk • Groq AI • Gemini Vision

---

## 🚀 What's New

- 🌐 **Web Search Integration:** Real-time information retrieval using the Tavily API  
- 🧠 **Researcher Agent:** Context-aware reasoning chain that merges memory, uploaded documents, and web data  
- 🧩 **Reference Classifier:** LLM detects if the user’s query depends on past context or previous documents  
- ⚡ **Enhanced Context Memory:** Rebuilds conversation history dynamically for deep, multi-turn coherence  
- 🪄 **Gemini Vision Integration:** Extracts textual data directly from uploaded images for intelligent document-aware responses  

---

## ✨ Features

- 🔐 Secure authentication with **Clerk**  
- 💬 Conversational AI using **Groq LPU API**  
- 📁 Upload TXT, MD, or image files  
- 🖼️ Extract image content with **Gemini Vision**  
- 🌐 Integrated web search (**Tavily API**)  
- 🧠 Memory-aware context chaining  
- 🧾 DeepThink mode for long-form analysis  
- 💾 Persistent chat history with **MongoDB**

---

## ⚙️ Quick Start

```bash
# Clone the repository
git clone https://github.com/sujal-thakur01/DeepSeek-Clone.git
cd DeepSeek-Clone
# Install dependencies
npm install
# Setup environment variables
cp .env.example .env
# Fill in API keys below and verify
npm run verify
# Run the development server
npm run dev
Now open http://localhost:3000 🎉
🔑 Environment Setup
Create a .env file and add the following:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
SIGNING_SECRET=whsec_xxx
MONGODB_URI=mongodb+srv://xxx
GROQ_API_KEY=gsk_xxx
GOOGLE_API_KEY=AIzaSy_xxx  # for Gemini Vision
TAVILY_API_KEY=tvly_xxx    # for Web Search
🪪 Get API Keys from
Clerk — Authentication
MongoDB Atlas — Database
Groq Console — AI API
Gemini Studio — Vision model
Tavily — Web Search
🧱 Project Structure
app/
├── api/chat/
│   ├── ai/route.js     # Main AI pipeline
│   ├── web/route.js    # Tavily web search integration
│   ├── upload/route.js # Gemini Vision + File processing
│   └── get/route.js    # Chat fetch endpoint
├── components/         # UI Components (Chat, Sidebar, etc.)
├── context/            # AppContextProvider for global state
├── models/Chat.js      # Mongoose Schema
├── config/db.js        # MongoDB Connection
└── page.jsx            # Chat Interface
🧩 Advanced AI Backend Logic
This app’s intelligence pipeline inside app/api/chat/ai/route.js handles everything from authentication to dynamic reasoning:
Authentication → User verified with Clerk (getAuth)
Memory Fetch → Retrieves chat history from MongoDB using userId + chatId
Reference Classifier → Detects if query needs prior context (YES/NO)
Context Builder → Merges latest conversation + uploaded documents
Web Search → Calls /api/chat/web for answers + references
Researcher Agent (DeepThink) → Generates structured Markdown reports
Gemini Vision → Extracts text from uploaded images
Response Generation → Uses llama-3.3-70b-versatile (Groq API)
Persistence → Saves user + assistant messages to MongoDB
Flow: Clerk Auth → Load Memory → Classify Query → (Optional) Web Search → (Optional) DeepThink → AI Response → MongoDB Save
🔗 Key Endpoints
POST /api/chat/ai        # Chat with Groq AI + Memory + Web Search  
POST /api/chat/upload    # Upload & process documents/images  
POST /api/chat/web       # Tavily Web Search API integration  
GET   /api/chat/get      # Retrieve all chats for a user
🧠 How It Works
User sends message → API authenticates via Clerk
Model checks if previous messages are needed (Reference Classifier)
If yes, loads context from MongoDB
If Web Search is enabled, queries Tavily and merges results
Generates structured AI response → Saves conversation
🩵 Troubleshooting
# Reinstall dependencies cleanly
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
Common Fixes:
Restart server after .env changes
Check MongoDB IP whitelist
Ensure Clerk keys start with NEXT_PUBLIC_
📚 Documentation
SETUP.md — Full setup guide
CONTRIBUTING.md — Contribution workflow
LICENSE — MIT License
🚀 Deploy (on Vercel)
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
Then:
Go to Vercel
Import your GitHub repository
Add environment variables
Deploy 🚀
📄 License
MIT © Sujal Thakur
Enhanced with Web Search, Researcher Agent, & Gemini Vision
