import { assets } from '@/assets/assets'
import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
import Image from 'next/image'
import React, { useState, useRef } from 'react'
import toast from 'react-hot-toast';

const PromptBox = ({setIsLoading, isLoading}) => {

    const [prompt, setPrompt] = useState('');
    const [pendingFiles, setPendingFiles] = useState([]); // Changed from uploadedFiles
    const fileInputRef = useRef(null);
    const {user, chats, setChats, selectedChat, setSelectedChat} = useAppContext();

    const handleKeyDown = (e)=>{
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            sendPrompt(e);
        }
    }

    const handleFileUpload = () => {
        if (!user) return toast.error('Login to upload files');
        if (pendingFiles.length >= 4) return toast.error('Maximum 4 files allowed');
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Check file limit
        if (pendingFiles.length + files.length > 4) {
            toast.error('Maximum 4 files allowed');
            return;
        }

        // Just add to pending files (don't upload yet)
        const newFiles = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file // Store the actual file object
        }));
        
        setPendingFiles(prev => [...prev, ...newFiles]);
        toast.success(`${files.length} file(s) selected`);
        
        // Reset file input
        e.target.value = '';
    };

    const removeFile = (fileId) => {
        setPendingFiles(prev => prev.filter(file => file.id !== fileId));
    };

    const uploadFilesToServer = async (files) => {
        if (files.length === 0) return [];

        try {
            const formData = new FormData();
            
            files.forEach((fileData) => {
                formData.append('files', fileData.file);
            });
            
            formData.append('userId', user.id);

            const response = await axios.post('/api/chat/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                return {
                    files: response.data.files,
                    documentData: response.data.documentData || ''
                };
            } else {
                throw new Error(response.data.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const getFileIcon = (type) => {
        if (type?.startsWith('image/')) return '🖼️';
        if (type?.includes('pdf')) return '📄';
        if (type?.includes('word') || type?.includes('document')) return '📝';
        if (type?.includes('text')) return '📋';
        return '📎';
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const sendPrompt = async (e)=>{
        const promptCopy = prompt;
        const pendingFilesCopy = [...pendingFiles];

        try {
            e.preventDefault();
            if(!user) return toast.error('Login to send message');
            if(isLoading) return toast.error('Wait for the previous prompt response');

            setIsLoading(true)
            setPrompt("")

            // Upload files to server when sending
            let uploadResponse = { files: [], documentData: '' };
            if (pendingFiles.length > 0) {
                uploadResponse = await uploadFilesToServer(pendingFiles);
            }

            // Extract just filenames for display
            const fileNames = uploadResponse.files.map(f => f.originalName || f.fileName || 'Unknown');

            const userPrompt = {
                role: "user",
                content: prompt,
                timestamp: Date.now(),
                files: fileNames,
                hasFiles: fileNames.length > 0,
                documentData: uploadResponse.documentData
            }

            // Clear pending files after successful upload
            setPendingFiles([]);

            // Show user message optimistically in UI
            setSelectedChat((prev)=> ({
                ...prev,
                messages: [...(prev?.messages ?? []), userPrompt]
            }))

        const {data} = await axios.post('/api/chat/ai', {
            chatId: selectedChat._id,
            prompt,
            filesMeta: uploadResponse.files,
            documentData: uploadResponse.documentData
        })

        if(data.success){
            setChats((prevChats)=>prevChats.map((chat)=>chat._id === selectedChat._id ? {...chat, messages: [...chat.messages, data.data]} : chat))

            const message = data.data.content;
            const messageTokens = message.split(" ");
            let assistantMessage = {
                role: 'assistant',
                content: "",
                timestamp: Date.now(),
            }

            setSelectedChat((prev) => ({
                ...prev,
                messages: [...prev.messages, assistantMessage],
            }))

            for (let i = 0; i < messageTokens.length; i++) {
               setTimeout(()=>{
                assistantMessage.content = messageTokens.slice(0, i + 1).join(" ");
                setSelectedChat((prev)=>{
                    const updatedMessages = [
                        ...prev.messages.slice(0, -1),
                        assistantMessage
                    ]
                    return {...prev, messages: updatedMessages}
                })
               }, i * 100)
            }
        }else{
            toast.error(data.message);
            setPrompt(promptCopy);
            setPendingFiles(pendingFilesCopy); // Restore files if message failed
        }

        } catch (error) {
            toast.error(error.message);
            setPrompt(promptCopy);
            setPendingFiles(pendingFilesCopy); // Restore files if upload failed
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <form onSubmit={sendPrompt}
     className={`w-full ${selectedChat?.messages.length > 0 ? "max-w-3xl" : "max-w-2xl"} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
        
        {/* Hidden file input */}
        <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.md,.png,.jpg,.jpeg,.gif"
            onChange={handleFileChange}
            style={{ display: 'none' }}
        />

        {/* Show pending files */}
        {pendingFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
                {pendingFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-2 bg-gray-600/50 px-3 py-2 rounded-lg text-sm border border-yellow-500/30">
                        <span className="text-lg">{getFileIcon(file.type)}</span>
                        <div className="flex flex-col">
                            <span className="text-white text-xs font-medium truncate max-w-[120px]">
                                {file.name}
                            </span>
                            <span className="text-gray-400 text-xs">
                                {formatFileSize(file.size)}
                            </span>
                        </div>
                        <span className="text-yellow-400 text-xs">Pending</span>
                        <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-white transition-colors ml-1"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        )}

        <textarea
        onKeyDown={handleKeyDown}
        className='outline-none w-full resize-none overflow-hidden break-words bg-transparent'
        rows={2}
        placeholder='Message DeepSeek' required 
        onChange={(e)=> setPrompt(e.target.value)} value={prompt}/>

        <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-2'>
                <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                    <Image className='h-5' src={assets.deepthink_icon} alt=''/>
                    DeepThink (R1)
                </p>
                <p className='flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                    <Image className='h-5' src={assets.search_icon} alt=''/>
                    Search
                </p>
            </div>

            <div className='flex items-center gap-2'>
                <div className="relative">
                    <Image 
                        className={`w-4 cursor-pointer hover:opacity-70 transition ${pendingFiles.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        src={assets.pin_icon} 
                        alt='Upload files'
                        onClick={handleFileUpload}
                    />
                    {pendingFiles.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {pendingFiles.length}
                        </span>
                    )}
                </div>
                <button className={`${prompt ? "bg-primary" : "bg-[#71717a]"} rounded-full p-2 cursor-pointer`}>
                    <Image className='w-3.5 aspect-square' src={prompt ? assets.arrow_icon : assets.arrow_icon_dull} alt=''/>
                </button>
            </div>
        </div>
    </form>
  )
}

export default PromptBox