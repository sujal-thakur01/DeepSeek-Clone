'use client';
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {selectedChat} = useAppContext()
  const containerRef = useRef(null)
  const userScrolledRef = useRef(false)
  const isAnimatingRef = useRef(false)

  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
      userScrolledRef.current = false // Reset on chat change
    }
  },[selectedChat])

  useEffect(()=>{
    if(containerRef.current && !userScrolledRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  },[messages])

  // Detect user scroll to disable auto-scroll
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    userScrolledRef.current = !isNearBottom;
  }



  return (
    <div>
      <ThemeToggle />
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand}/>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image onClick={()=> (expand ? setExpand(false) : setExpand(true))}
             className="rotate-180" src={assets.menu_icon} alt=""/>
            <Image className="opacity-70" src={assets.chat_icon} alt=""/>
          </div>

          {messages.length === 0 ? (
            <>
            <div className="flex items-center gap-3">
              <Image src={assets.logo_icon} alt="" className="w-12 h-auto"/>
              <p className="text-2xl font-medium">Hi, I'm NoBody.</p>
            </div>
            <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ):
          (
          <div ref={containerRef}
          onScroll={handleScroll}
          className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
          > 
          <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">{selectedChat.name}</p>
          {messages.map((msg, index)=> {
            // Defensive: ensure files is always an array of strings
            let files = msg.files || [];
            if (files.length > 0 && typeof files[0] === 'object') {
              // Old format: extract originalName or fileName
              files = files.map(f => f.originalName || f.fileName || 'Unknown');
            }
            return (
              <Message key={index} role={msg.role} content={msg.content} files={files}/>
            );
          })}
          {
            isLoading && (
              <div className="flex gap-4 max-w-3xl w-full py-3">
                <Image className="h-9 w-9 p-1 border border-white/15 rounded-full"
                 src={assets.logo_icon} alt="Logo"/>
                 <div className="loader flex justify-center items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                 </div>
              </div>
            )
          }
            
          </div>
        )
        }
        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} isAnimatingRef={isAnimatingRef}/>
        <p className="text-xs absolute bottom-1 text-gray-500">Feel free to ask....</p>

        </div>
      </div>
    </div>
  );
}
