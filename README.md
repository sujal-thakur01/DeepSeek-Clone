# DeepSeek Chat App

AI chat with **document processing**, **web search**, and a **researcher agent** — powered by **Groq** and **Gemini Vision**.

**Tech Stack:** Next.js 15 • React 19 • MongoDB • Clerk • Groq AI • Gemini Vision

---

## 🚀 What's New

- 🌐 **Web Search Integration:** Real-time information retrieval using the Tavily API  
- 🧠 **Researcher Agent:** Context-aware reasoning chain that merges memory, uploaded documents, and web data  
- 🧩 **Reference Classifier:** LLM detects if the user’s query depends on past context or previous documents  
- ⚡ **Enhanced Context Memory:** Rebuilds conversation history dynamically for deep, multi-turn coherence  
- 🪄 **Gemini Vision Integration:** Extracts textual data directly from uploaded images for intelligent, document-aware responses  

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
```

```bash
# Install dependencies
npm install
```

```bash
# Setup environment variables
cp .env.example .env
```

```bash
# Verify setup
npm run verify
```

```bash
# Run the development server
npm run dev
```

Now open ➡️ **http://localhost:3000** 🎉  

---

## 🔑 Environment Setup

Create a `.env` file and add the following:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
SIGNING_SECRET=whsec_xxx
MONGODB_URI=mongodb+srv://xxx
GROQ_API_KEY=gsk_xxx
GOOGLE_API_KEY=AIzaSy_xxx   # for Gemini Vision
TAVILY_API_KEY=tvly_xxx     # for Web Search
```

### 🪪 Get API Keys From

- [Clerk](https://clerk.com) — Authentication  
- [MongoDB Atlas](https://mongodb.com/atlas) — Database  
- [Groq Console](https://console.groq.com) — AI API  
- [Gemini Studio](https://aistudio.google.com/app/apikey) — Vision Model  
- [Tavily](https://tavily.com) — Web Search  

---

## 🧱 Project Structure

```bash
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
```

---

## 🧩 Advanced AI Backend Logic

This app’s intelligence pipeline inside `app/api/chat/ai/route.js` handles everything from authentication to dynamic reasoning:

1. **Authentication** → User verified with Clerk (`getAuth`)  
2. **Memory Fetch** → Retrieves chat history from MongoDB (`userId` + `chatId`)  
3. **Reference Classifier** → Detects if query needs prior context (YES/NO)  
4. **Context Builder** → Merges conversation + uploaded document data  
5. **Web Search** → If enabled, calls `/api/chat/web` (Tavily API) for references  
6. **Researcher Agent (DeepThink)** → Produces structured Markdown reports  
7. **Gemini Vision** → Reads and extracts text from uploaded `.png`, `.jpg`, etc.  
8. **Response Generation** → Uses `llama-3.3-70b-versatile` (Groq API)  
9. **Persistence** → Saves user + assistant messages to MongoDB  

**Flow:**  
`Clerk Auth → Load Memory → Classify Query → (Optional) Web Search → (Optional) DeepThink → AI Response → MongoDB Save`

---

## 🔗 Key Endpoints

```bash
POST /api/chat/ai       # Chat with Groq AI + Memory + Web Search
POST /api/chat/upload   # Upload & process documents/images
POST /api/chat/web      # Tavily Web Search API integration
GET  /api/chat/get      # Retrieve all chats for a user
```

---

## 🧠 How It Works

1. User sends a message → API authenticates via Clerk  
2. Model checks if previous messages are needed (**Reference Classifier**)  
3. If yes, loads relevant history & context from MongoDB  
4. If Web Search is enabled, queries Tavily and merges results  
5. Generates structured AI response (Groq) → Saves conversation  

---

## 🩵 Troubleshooting

```bash
# Reinstall dependencies cleanly
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Common fixes:**  
- Restart server after `.env` changes  
- Check MongoDB IP whitelist  
- Ensure Clerk keys start with `NEXT_PUBLIC_` prefix  

---

## 📚 Documentation

- `SETUP.md` — Full setup guide  
- `CONTRIBUTING.md` — Contribution workflow  
- `LICENSE` — MIT License  

---

## 🚀 Deploy

### ✅ Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

Then:  
- Go to [Vercel](https://vercel.com)  
- Import your GitHub repository  
- Add environment variables  
- Deploy 🚀  

---

## 📄 License

**MIT © Sujal Thakur** — Enhanced with **Web Search**, **Researcher Agent**, & **Gemini Vision**  
