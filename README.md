
# DeepSeek Chat App

This is a full-stack chat application built with Next.js, React, MongoDB, Clerk authentication, and DeepSeek/Groq AI integration.

## Features
- User authentication with Clerk
- Real-time chat powered by DeepSeek/Groq AI models
- MongoDB for chat history and user data
- Modern UI with React and Tailwind CSS

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Create a `.env` file in the root directory and add:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_uri
SIGNING_SECRET=your_signing_secret
DEEPSEEK_API_KEY=your_deepseek_api_key
GROQ_API_KEY=your_groq_api_key
```

### 3. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `app/` - Next.js app directory (API routes, pages, layout)
- `components/` - React UI components
- `models/` - Mongoose models
- `config/` - Database config
- `context/` - React context
- `assets/` - SVGs and static assets
- `public/` - Public files

## API Usage
- Chat API: `/api/chat/ai` (POST)
- Other chat endpoints: `/api/chat/get`, `/api/chat/create`, `/api/chat/delete`, `/api/chat/rename`

## Customization
- Update UI in `components/`
- Change AI model in API route files

## Deployment
Deploy easily on Vercel or any Node.js hosting platform.

## License
MIT
