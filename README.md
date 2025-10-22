DeepSeek Chat App
AI chat with document processing, web search, and a researcher agent — powered by Groq and Gemini Vision.  Tech Stack: Next.js 15 • React 19 • MongoDB • Clerk • Groq AI • Gemini Vision
🚀 What's New
🌐 Web Search Integration: Real-time information retrieval using the Tavily API.
🧠 Researcher Agent: Context-aware reasoning chain that merges memory, uploaded documents, and web data.
🧩 Reference Classifier: LLM detects if the user’s query depends on past context or previous documents.
⚡ Enhanced Context Memory: Rebuilds conversation history dynamically for deep, multi-turn coherence.
🪄 Gemini Vision Integration: Extracts textual data directly from uploaded images for intelligent, document-aware responses.
✨ Features
🔐 Secure authentication with Clerk
💬 Conversational AI using Groq LPU API
📁 Upload TXT, MD, or image files
🖼️ Extract image content with Gemini Vision
🌐 Integrated web search (Tavily API)
🧠 Memory-aware context chaining
🧾 DeepThink mode for long-form analysis
💾 Persistent chat history with MongoDB
⚙️ Quick Start
# Clone the repository git clone https://github.com/sujal-thakur01/DeepSeek-Clone.git cd DeepSeek-Clone  # Install dependencies npm install  # Setup environment variables cp .env.example .env  # Verify setup npm run verify  # Run the development server npm run dev  Now open http://localhost:3000 🎉
🔑 Environment Setup
Create a .env file and add the following:  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx CLERK_SECRET_KEY=sk_test_xxx SIGNING_SECRET=whsec_xxx MONGODB_URI=mongodb+srv://xxx GROQ_API_KEY=gsk_xxx GOOGLE_API_KEY=AIzaSy_xxx   # for Gemini Vision TAVILY_API_KEY=tvly_xxx     # for Web Search
 MIT © Sujal Thakur — Enhanced with Web Search, Researcher Agent & Gemini Vision.
