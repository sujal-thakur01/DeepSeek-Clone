export const maxDuration = 60;
import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";


// Initialize OpenAI client with DeepSeek API key and base URL
const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req){
    try {
        const {userId} = getAuth(req)

        // Extract chatId and prompt from the request body
        const { chatId, prompt } = await req.json();

        if(!userId){
            return NextResponse.json({
                success: false,
                message: "User not authenticated",
              });
        }

        // Find the chat document in the database based on userId and chatId
        await connectDB()
        const data = await Chat.findOne({userId, _id: chatId})

        // Create a user message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now()
        };

        const old_chats = await Chat.find({ userId })
            .sort({ timestamp: -1 }) // newest first
            .limit(10);

        const allMessages = old_chats.flatMap(chat => chat.messages || []);
        const lastUserMessages = allMessages.slice(-5) || null;
        const lastUserMessagesString = lastUserMessages.map(msg => {
            const role = msg.role === "user" ? "User" : "Assistant";
            return `${role}: ${msg.content}`;
        }).join("\n");

        data.messages.push(userPrompt);

        console.log(prompt)
        const promptTemplate = `
            You are a helpful assistant. Here is the recent conversation:
            ${lastUserMessagesString}.
            For any question if user refer to old messages , you can use them.
            Here is the current message sent by user: 
            User: ${prompt}
            Please respond appropriately to the user's latest message.
            `.trim();
        console.log(promptTemplate);

        // Call the DeepSeek API to get a chat completion
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: promptTemplate }],
            model: "openai/gpt-oss-20b",
        });

        const message = completion.choices[0].message;
        message.timestamp = Date.now()
        data.messages.push(message);
        data.save();

        return NextResponse.json({success: true, data: message})
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message });
    }
}