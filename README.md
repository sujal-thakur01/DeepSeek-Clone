# DeepSeek Chat App

AI chat with document processing and image analysis powered by Groq and Gemini Vision.

**Tech Stack:** Next.js 15 • React 19 • MongoDB • Clerk • Groq AI • Gemini Vision

## Features

- 🔐 Clerk authentication
- 💬 AI chat with Groq
- 📁 File uploads (TXT, MD, images)
- 🖼️ Image text extraction (Gemini Vision)
- 🔗 Smart context (detects "previous message" references)
- 💾 MongoDB chat history

## Quick Start

```bash
git clone https://github.com/prathamtomar99/DeepSeek-Clone.git
cd deepseek
npm install
cp .env.example .env
# Edit .env with your API keys
npm run verify
npm run dev
```

Open **http://localhost:3000**

## Environment Setup

Create `.env` with:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx  
SIGNING_SECRET=whsec_xxx
MONGODB_URI=mongodb+srv://xxx
GROQ_API_KEY=gsk_xxx
GOOGLE_API_KEY=AIzaSy_xxx  # Optional
```

**Get API Keys:**
- [Clerk](https://clerk.com) - Free auth
- [MongoDB](https://mongodb.com/atlas) - Free database  
- [Groq](https://console.groq.com) - Free AI API
- [Gemini](https://aistudio.google.com/app/apikey) - Free vision API

## Project Structure

```
app/
├── api/chat/
│   ├── ai/      # Chat endpoint
│   ├── upload/  # File uploads
│   └── ...      # CRUD operations
├── page.jsx     # Main UI
components/      # React components
models/          # MongoDB schemas
```

## Key API Endpoints

```
POST /api/chat/ai       # AI response
POST /api/chat/upload   # File upload
GET  /api/chat/get      # Get chats
```

## Commands

```bash
npm run dev     # Development
npm run build   # Production build
npm run verify  # Check setup
npm run lint    # Lint code
```

## How It Works

1. **Upload files** → Extracted with Gemini Vision (images) or fs (text)
2. **Send message** → Context includes last 5 messages if user says "previous"
3. **AI responds** → Groq generates response with document context
4. **Data stored** → MongoDB saves chat + document data

## Troubleshooting

**Module errors?**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Env vars not loading?**
- Restart dev server after `.env` changes
- Check variable names are exact

**MongoDB connection failed?**
- Whitelist your IP in MongoDB Atlas
- Verify connection string format

## Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup + troubleshooting
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

## Deploy

### Vercel (Recommended)
1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms
Works on Netlify, Railway, or any Node.js hosting.

## License

MIT © [Pratham Tomar](https://github.com/prathamtomar99)

---

**Need help?** See [SETUP.md](SETUP.md) or create an issue!
