import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Bot, User, ArrowLeft, Home } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";

const End = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const transcript = location.state?.transcript || [];

  return (
    <div className="min-h-screen bg-[#F5FBDA] text-[#450C3F]">
      {/* Header */}
      <header className="border-b border-[#450C3F]/10 bg-[#450C3F] px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-[#F5FBDA]">
              Interview Completed
            </h1>

            <p className="mt-1 text-xs text-[#F5FBDA]/50">
              Your conversation with Mr. Bob
            </p>
          </div>

          <CheckCircle size={32} className="text-[#B9D175]" />
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-5 py-10">
        {/* Completion Card */}
        <div className="mb-8 rounded-3xl border border-[#450C3F]/10 bg-white/80 p-8 text-center shadow-lg">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#D9EFBD]">
            <CheckCircle size={34} className="text-[#450C3F]" />
          </div>

          <h2 className="text-3xl font-black">Great job, Shreya! 🎉</h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#450C3F]/60">
            Your technical interview with Mr. Bob has been completed. Here's the
            transcript of your conversation.
          </p>
        </div>

        {/* Transcript */}
        <div className="rounded-3xl border border-[#450C3F]/10 bg-white/70 shadow-lg">
          <div className="border-b border-[#450C3F]/10 px-6 py-5">
            <h2 className="text-xl font-black">Interview Transcript</h2>

            <p className="mt-1 text-xs text-[#450C3F]/45">
              Complete conversation between you and Mr. Bob
            </p>
          </div>

          <div className="space-y-6 p-6">
            {transcript.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-[#450C3F]/50">
                  No transcript available.
                </p>
              </div>
            ) : (
              transcript.map((message, index) => {
                const isBob = message.responseBy === "agent";

                return (
                  <div
                    key={message._id || index}
                    className={`flex gap-4 ${
                      isBob ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isBob
                          ? "bg-[#B9D175] text-[#450C3F]"
                          : "bg-[#450C3F] text-[#F5FBDA]"
                      }`}
                    >
                      {isBob ? <Bot size={18} /> : <User size={18} />}
                    </div>

                    {/* Message */}
                    <div
                      className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                        isBob
                          ? "border border-[#B9D175]/30 bg-[#F5FBDA]"
                          : "bg-[#450C3F] text-[#F5FBDA]"
                      }`}
                    >
                      <div
                        className={`mb-2 text-[10px] font-black uppercase tracking-widest ${
                          isBob ? "text-[#450C3F]/40" : "text-[#F5FBDA]/50"
                        }`}
                      >
                        {isBob ? "Mr. Bob" : "You"}
                      </div>

                      <p className="text-sm leading-relaxed">
                        {message.message}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 rounded-xl border border-[#450C3F]/15 bg-white px-5 py-3 text-sm font-bold transition hover:bg-[#D9EFBD]"
          >
            <ArrowLeft size={17} />
            Start New Interview
          </button>
        </div>
      </main>
    </div>
  );
};

export default End;

