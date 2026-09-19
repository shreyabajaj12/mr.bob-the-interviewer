import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock3,
  History,
  X,
  Send,
  Bot,
  User,
} from "lucide-react";

import mrBob from "../assets/mr-bob-wt-bg.png";
import { useRef } from "react";

const Interview = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
  const [answer, setAnswer] = useState("");

  // Temporary data. Later sourced from backend / LangGraph.
  const [messages, setMessages] = useState([]);
  const navigate=useNavigate();
  const [conversationId,setConversationId]=useState(null)

  useEffect(()=>{
    const validateInterview =async()=>{
      try{
        const response =await axios.get(
          "http://localhost:8000/api/interview/current",
          {
            withCredentials: true
          }
        )
        console.log("Interview sesssion:",response.data);
        setConversationId(response.data.conversationId)
        setMessages([
          {
            id:Date.now(),
            sender:"bob",
            text:response.data.question
          }
        ])
      }
      catch(error){
        console.error("Invalid interview session");

        navigate("/upload",{
          replace:true
        })
      }
    };
    validateInterview();
  },[navigate]);

const endInterview=async()=>{
        try {
             const response =await axios.post(
          "http://localhost:8000/api/interview/end",{},
          {
            withCredentials: true
          }
        )
        console.log("Interview sesssion:",response.data);
        navigate("/end",{
          replace:true,
          state:{
            transcript:response.data.transcript
          }
        })

        } catch (error) {
            console.error("Failed to end the interview");

            navigate("/upload",{
            replace:true
            })
        }
}

  const currentQuestion =
    messages[messages.length - 1]?.sender === "bob"
      ? messages[messages.length - 1].text
      : "Take a moment to prepare your answer.";

  const handleSendAnswer = async() => {
    if (!answer.trim() || !conversationId) return;

    const userAnswer=answer.trim();
    setMessages((previous)=>[
      ...previous,
      {
        id:Date.now(),
        sender:"user",
        text:userAnswer,
      }
    ])
    setAnswer("")
    try{
      const response =await axios.post(
        "http://localhost:8000/api/interview/chat",
        {
          conversationId:conversationId,
          answer:userAnswer
        },
        {
          withCredentials:true,
        }
      )
      console.log("next question:",response.data);
      setMessages((previous)=>[
        ...previous,
        {
          id:Date.now(),
          sender:"bob",
          text:response.data.question
        }
      ])
    }
    catch(error){
      console.error(
        "failed to send answer",
        error.response?.data
      )
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendAnswer();
    }
  };

  const startTimeRef = useRef(Date.now());

const [elapsedTime, setElapsedTime] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setElapsedTime(Date.now() - startTimeRef.current);
  }, 1000);

  return () => clearInterval(interval);
}, []);

const minutes = Math.floor(elapsedTime / 60000);

const seconds = Math.floor(
  (elapsedTime % 60000) / 1000
);

const formattedTime =
  `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F5FBDA] text-[#450C3F]">
      {/* Top Bar */}
      <header className="z-30 flex h-[76px] shrink-0 items-center justify-between border-b border-[#B9D175]/20 bg-[#450C3F] px-5 text-[#F5FBDA] lg:px-7">
        {/* Left Section */}
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#B9D175] text-[#450C3F]">
            <Bot size={23} />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-black sm:text-xl">
              Interview Room
            </h1>
            <p className="truncate text-xs text-[#F5FBDA]/50">
              Session ID: session-001
            </p>
          </div>
        </div>

        {/* Center Controls */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Timer */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 font-mono text-sm">
            <Clock3 size={16} className="text-[#B9D175]" />
            <span>{formattedTime}</span>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={() => setIsAudioOn(!isAudioOn)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/15"
          >
            {isAudioOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
            {isAudioOn ? "Audio On" : "Audio Off"}
          </button>

          {/* History Toggle */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/15"
          >
            <History size={15} />
            History ({messages.length})
          </button>
        </div>

        {/* Right Section */}
        <button 
        onClick={endInterview}
        className="flex
        cursor-pointer
        items-center gap-2 rounded-xl border border-[#B9D175]/40 bg-[#450C3F] px-4 py-2.5 text-sm font-bold text-[#F5FBDA] transition hover:bg-[#5C1554] sm:px-5">
          <X size={17} />
          <span className="hidden sm:inline">End Interview</span>
        </button>
      </header>

      {/* Mobile Controls */}
      <div className="flex shrink-0 items-center justify-center gap-2 border-b border-[#B9D175]/10 bg-[#450C3F] px-4 py-3 md:hidden">
        <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs">
          <Clock3 size={14} />
          00:42
        </div>

        <button
          onClick={() => setIsAudioOn(!isAudioOn)}
          className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs"
        >
          {isAudioOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
          Audio
        </button>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs"
        >
          <History size={14} />
          History
        </button>
      </div>

      {/* Main Interview Area */}
      <div className="flex flex-1 min-h-0">
        {/* Left / Main Stage */}
        <main className="relative flex flex-1 min-w-0 flex-col overflow-hidden">
          {/* Background Decoration */}
          <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#D9EFBD] opacity-70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 right-20 h-[400px] w-[400px] rounded-full bg-[#B9D175]/25 blur-3xl" />

          {/* Bob Character Area */}
          <div className="relative flex flex-1 min-h-0 flex-col items-center justify-center px-6 pb-4 pt-8">
            {/* Live Indicator */}
            <div className="absolute left-7 top-7 hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#450C3F]/40 lg:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#B9D175]" />
              Live Interview
            </div>

            {/* Mr. Bob Image Container */}
            <div className="relative flex flex-1 min-h-0 w-full items-end justify-center">
              {/* Background Circle */}
              <div className="absolute h-[280px] w-[280px] rounded-full border border-[#B9D175]/50 bg-[#D9EFBD] sm:h-[340px] sm:w-[340px] lg:h-[390px] lg:w-[390px]" />

              {/* Decorative Animated Ring */}
              <div className="absolute h-[330px] w-[330px] animate-[spin_30s_linear_infinite] rounded-full border border-dashed border-[#B9D175]/60 sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px]" />

              <img
                src={mrBob}
                alt="Mr. Bob"
                className="relative z-10 h-full max-h-[430px] max-w-[90%] select-none object-contain drop-shadow-[0_25px_25px_rgba(69,12,63,0.20)] sm:max-h-[480px] lg:max-h-[500px]"
              />

              {/* Status Badge */}
              <div className="absolute bottom-2 z-20 flex items-center gap-2 rounded-full bg-[#450C3F] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F5FBDA] shadow-xl sm:bottom-4">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#B9D175]" />
                Mr. Bob is ready
              </div>
            </div>
          </div>

          {/* Live Question / Caption Box */}
          <div className="shrink-0 px-5 pb-5 lg:px-10">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#450C3F]/10 bg-white/80 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2 px-5 pt-4">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#450C3F]/45">
                  Live question
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#B9D175]" />
                <span className="text-[10px] text-[#450C3F]/40">Mr. Bob</span>
              </div>

              <p className="px-5 py-4 text-base font-semibold leading-relaxed sm:text-sm lg:text-sm">
                "{currentQuestion}"
              </p>
            </div>
          </div>

          {/* Answer Input Controls */}
          <div className="shrink-0 border-t border-[#450C3F]/10 bg-white/70 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-10">
            <div className="mx-auto flex max-w-5xl items-center gap-3">
              {/* Mic Toggle Button */}
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isMicOn
                    ? "border-[#450C3F] bg-[#450C3F] text-[#F5FBDA] shadow-lg shadow-[#450C3F]/20"
                    : "border-[#450C3F]/10 bg-[#D9EFBD] text-[#450C3F] hover:bg-[#B9D175]"
                }`}
              >
                {isMicOn ? <Mic size={23} /> : <MicOff size={23} />}
              </button>

              {/* Text Area */}
              <div className="relative flex-1 min-w-0">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isMicOn
                      ? "Listening..."
                      : "Type your technical answer here..."
                  }
                  rows={1}
                  className="h-14 w-full resize-none rounded-2xl border border-[#450C3F]/15 bg-[#F5FBDA] px-5 py-4 text-sm text-[#450C3F] outline-none transition placeholder:text-[#450C3F]/35 focus:border-[#450C3F]/40 focus:ring-2 focus:ring-[#B9D175]/40 sm:text-sm "
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendAnswer}
                cursor-pointer
                disabled={!answer.trim()}
                className="flex h-14 shrink-0 items-center gap-2 rounded-2xl bg-[#450C3F] px-5 font-bold text-[#F5FBDA] transition hover:bg-[#5C1554] disabled:cursor-not-allowed disabled:opacity-30 sm:px-6"
              >
                <span className="cursor-pointer hidden sm:inline">Send</span>
                <Send size={19} />
              </button>
            </div>

            <p className="mx-auto mt-2 text-center text-[10px] text-[#450C3F]/35">
              Press Enter to send · Shift + Enter for a new line
            </p>
          </div>
        </main>

        {/* Transcript Drawer / Sidebar */}
        {showHistory && (
          <aside className="z-20 flex w-[360px] shrink-0 flex-col border-l border-[#B9D175]/20 bg-[#450C3F] text-[#F5FBDA] xl:w-[410px]">
            {/* Drawer Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-[#F5FBDA]/10 px-6 py-5">
              <div>
                <h2 className="text-xl font-black">Interview Transcript</h2>
                <p className="mt-1 text-xs text-[#F5FBDA]/40">
                  Your conversation with Mr. Bob
                </p>
              </div>

              <button
                onClick={() => setShowHistory(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/15"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message History List */}
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      message.sender === "bob"
                        ? "bg-[#B9D175] text-[#450C3F]"
                        : "bg-[#F5FBDA]/10 text-[#F5FBDA]"
                    }`}
                  >
                    {message.sender === "bob" ? (
                      <Bot size={17} />
                    ) : (
                      <User size={17} />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                      message.sender === "bob"
                        ? "border border-[#B9D175]/20 bg-[#F5FBDA]/10"
                        : "bg-[#B9D175] text-[#450C3F]"
                    }`}
                  >
                    <div className="mb-1.5 text-[10px] font-black uppercase tracking-widest opacity-50">
                      {message.sender === "bob" ? "Mr. Bob" : "You"}
                    </div>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="shrink-0 border-t border-[#F5FBDA]/10 px-5 py-4">
              <div className="flex items-center gap-2 text-xs text-[#F5FBDA]/40">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#B9D175]" />
                Interview in progress
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Interview;
