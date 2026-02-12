'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState<'initial' | 'doubt' | 'email' | 'phone' | 'complete'>('initial');
  
  // Form data
  const [formData, setFormData] = useState({
    doubt: '',
    email: '',
    phone: ''
  });

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Waving animation state
  const [isWaving, setIsWaving] = useState(false);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Periodic waving animation when closed
  useEffect(() => {
    if (isOpen) return;
    
    const interval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 5000); // Wave for 4 seconds
    },10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      // Small delay for natural feel
      setIsTyping(true);
      setTimeout(() => {
        addBotMessage("Hi there! 👋 Have any questions? Please tell me what's on your mind.");
        setStep('doubt');
        setIsTyping(false);
      }, 600);
    }
  };

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'bot',
      text
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For phone step, we validate differently because the input is controlled by PhoneInput
    if (step === 'phone') {
        if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
            // Optional: You could add a temporary bot message here if invalid
            // For now, we just don't submit
            const errorMsg: Message = {
                id: Date.now().toString(),
                sender: 'bot',
                text: "Please enter a valid phone number."
            };
            setMessages(prev => [...prev, errorMsg]);
            return;
        }
        
        // Show the user's phone number as a message
        addUserMessage(formData.phone);
    } else {
        if (!inputText.trim()) return;
        
        // Email Validation
        if (step === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputText.trim())) {
                const errorMsg: Message = {
                    id: Date.now().toString(),
                    sender: 'bot',
                    text: "Please enter a valid email address (e.g., name@example.com)."
                };
                setMessages(prev => [...prev, errorMsg]);
                return;
            }
        }

        const userInput = inputText.trim();
        addUserMessage(userInput);
        setInputText('');
    }

    setIsTyping(true);

    // Process flow based on current step
    setTimeout(async () => {
      if (step === 'doubt') {
        setFormData(prev => ({ ...prev, doubt: inputText.trim() }));
        addBotMessage("Got it! Can you please share your email address so we can get back to you?");
        setStep('email');
      } else if (step === 'email') {
        setFormData(prev => ({ ...prev, email: inputText.trim() }));
        addBotMessage("Thanks! Lastly, what's your phone number?");
        setStep('phone');
      } else if (step === 'phone') {
        // Phone data is already in formData.phone due to the onChange handler of PhoneInput
        const finalData = { ...formData }; // phone is already updated
        
        addBotMessage("Perfect! processing your request...");
        
        // Send data to API
        try {
            const response = await fetch('/api/chat-bot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData),
            });
            
            if (response.ok) {
                addBotMessage("Thank you! We've received your details and will contact you shortly.");
            } else {
                addBotMessage("Oops, something went wrong. Please try again later or email us directly.");
            }
        } catch (error) {
            addBotMessage("Oops, something went wrong sending your request.");
        }
        
        setStep('complete');
      }
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      
      {/* Bot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[350px] sm:w-[380px] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[500px]"
          >
            {/* Header */}
            <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                   {/* Simple Robot Face Icon */}
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <rect x="2" y="4" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="8" cy="10" r="2" fill="currentColor"/>
                      <circle cx="16" cy="10" r="2" fill="currentColor"/>
                      <path d="M7 16H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                   </svg>
                </div>
                <div>
                  <h3 className="text-black font-medium text-sm">TheCraftSync Bot</h3>
                  <p className="text-xs text-gray-500">Always here to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto h-[350px] bg-gray-50 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-black text-white rounded-br-none'
                          : 'bg-white text-black rounded-bl-none border border-gray-200'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              {step === 'phone' ? (
                <PhoneInput
                    defaultCountry="IN"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value || '' }))}
                    disabled={isTyping}
                    className="flex-1 phone-input-container"
                />
              ) : (
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                        step === 'doubt' ? "Type your question..." : 
                        step === 'email' ? "Type your email..." :
                        step === 'complete' ? "Conversation ended" : "Type a message..."
                    }
                    disabled={step === 'complete' || isTyping}
                    className="flex-1 bg-gray-100 text-black text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-black/20 border-transparent placeholder:text-gray-400 disabled:opacity-50"
                />
              )}
              
              <button
                type="submit"
                disabled={
                    (step === 'phone' ? !formData.phone : !inputText.trim()) || 
                    step === 'complete' || 
                    isTyping
                }
                className="bg-black hover:bg-gray-800 text-white p-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
          <motion.button
            onClick={handleOpen}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group bg-white text-black p-4 rounded-full shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-300 z-50 overflow-visible cursor-pointer"
        >
            {/* Tooltip / Speech Bubble */}
            {/* Tooltip / Cloud Bubble */}
            <div className={`absolute bottom-full right-0 mb-4 mr-1 whitespace-nowrap transition-all duration-300 origin-bottom-right
              ${isWaving ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2 pointer-events-none'}
            `}>
                <div className="relative bg-white text-black text-sm font-medium px-5 py-3 rounded-[20px] shadow-xl border border-gray-100">
                    Have any doubts?
                    
                    {/* Cloud/Thought Tail */}
                    <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white rounded-full"></div>
                    <div className="absolute -bottom-4 right-5 w-2 h-2 bg-white rounded-full"></div>
                </div>
            </div>

          <div className={`flex items-center justify-center relative ${isWaving ? 'animate-wave-hand' : ''}`}>
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                <rect x="2" y="4" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="2"/>
                <circle cx="8" cy="10" r="2" fill="currentColor"/>
                <circle cx="16" cy="10" r="2" fill="currentColor"/>
                <path d="M7 16H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
             </svg>
          </div>
          
          {/* Pulse effect */}
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </motion.button>
      )}
      
      {/* Add custom wave animation to tailwind if not exists, or use inline styles */}
      <style jsx global>{`
        @keyframes wave {
            0% { transform: rotate(0deg); }
            10% { transform: rotate(14deg); }
            20% { transform: rotate(-8deg); }
            30% { transform: rotate(14deg); }
            40% { transform: rotate(-4deg); }
            50% { transform: rotate(10deg); }
            60% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
        }
        .animate-wave-hand {
            animation: wave 2s infinite;
            transform-origin: 70% 70%;
        }
        
        /* Custom styles for PhoneInput */
        .phone-input-container {
            display: flex;
            align-items: center;
        }
        .phone-input-container .PhoneInputCountry {
            margin-right: 8px;
        }
        .phone-input-container .PhoneInputInput {
            flex: 1;
            background-color: #f3f4f6;
            border-radius: 0.75rem;
            padding: 0.625rem 1rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            border: 1px solid transparent;
            outline: none;
            color: black;
        }
        .phone-input-container .PhoneInputInput:focus {
            --tw-ring-color: rgba(0, 0, 0, 0.2);
            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
            border-color: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
