export const maxDuration = 60;
import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req){
    try {
        const {userId} = getAuth(req)
        const { chatId, prompt, filesMeta = [], documentData = '' } = await req.json();
        
        if(!userId){
            return NextResponse.json({
                success: false,
                message: "User not authenticated",
            });
        }

        // Extract filenames from uploaded files
        const fileNames = Array.isArray(filesMeta) 
            ? filesMeta.map(f => f.originalName || f.fileName || f.name || 'Unknown')
            : [];

        await connectDB()
        const data = await Chat.findOne({userId, _id: chatId})

        // Create and save user message
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            files: fileNames,
            hasFiles: fileNames.length > 0,
            documentData: documentData
        };
        data.messages.push(userPrompt);
        
        // Get recent chat context
        const old_chats = await Chat.find({ userId })
            .sort({ timestamp: -1 })
            .limit(10);

        const allMessages = old_chats.flatMap(chat => chat.messages || []);
        
        // Check if user is referring to previous context
        const referenceKeywords = ['previous', 'last', 'earlier', 'above', 'that document', 'that file', 'you said', 'mentioned', 'refer', 'what i sent', 'the file', 'document', 'history'];
        const isReferencingPrevious = referenceKeywords.some(keyword => 
            prompt.toLowerCase().includes(keyword)
        );
        
        // Build context chain based on reference detection
        let contextChain = '';
        
        if (isReferencingPrevious) {
            // Include last 5 user messages with their documents
            const lastUserMessages = allMessages
                .filter(msg => msg.role === "user")
                .slice(-5)
                .reverse(); // Most recent first
            
            contextChain = lastUserMessages
                .map((msg, idx) => {
                    const msgContent = msg.content || '';
                    const docContent = msg.documentData 
                        ? `\n[Attached Document]: ${msg.documentData.substring(0, 800)}${msg.documentData.length > 800 ? '...' : ''}`
                        : '';
                    return `Message ${idx + 1}: ${msgContent}${docContent}`;
                })
                .join('\n\n');
        } else {
            // Only include last 2 messages for context
            const lastUserMessages = allMessages
                .filter(msg => msg.role === "user")
                .slice(-2)
                .reverse();
            
            const lastMsg = lastUserMessages[0];
            const secondLastMsg = lastUserMessages[1];
            
            const lastMessage = lastMsg 
                ? `${lastMsg.content || ''}${lastMsg.documentData ? '\n[Document: ' + lastMsg.documentData.substring(0, 400) + '...]' : ''}`
                : null;
                
            const secondLastMessage = secondLastMsg 
                ? `${secondLastMsg.content || ''}${secondLastMsg.documentData ? '\n[Document: ' + secondLastMsg.documentData.substring(0, 400) + '...]' : ''}`
                : null;
                
            contextChain = `LastMessage: ${lastMessage}\nSecondLastMessage: ${secondLastMessage}`;
        }

        // Build document context if available
        const documentContext = documentData 
            ? `\n\nFetched Document Data:\n${documentData}\n\nUse the above document content to answer the user's question.`
            : '';

        // Generate AI response with smart context
        const promptTemplate = isReferencingPrevious
            ? `You are a helpful assistant. The user is referring to previous messages or documents.
            
Context Chain (Previous Messages & Documents):
${contextChain}
${documentContext}

Current User Message: ${prompt}

Instructions:
- The user is referencing previous context, so carefully review the context chain above
- If they mention "previous", "last", "that document", etc., use the relevant information from the context
- Provide a clear and accurate response based on both the context and current message`
            : `You are a helpful assistant. Here is the recent conversation context:
${contextChain}
${documentContext}

Current User Message: ${prompt}

Please respond appropriately to the user's message.`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: promptTemplate }],
            model: "openai/gpt-oss-20b",
        });

        const message = completion.choices[0].message;
        message.timestamp = Date.now()
        data.messages.push(message);
        await data.save();
        
        return NextResponse.json({success: true, data: message})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
