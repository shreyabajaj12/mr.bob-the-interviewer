import React from "react";
import {
  ArrowRight,
  Brain,
  FileText,
  Mic,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import mrBob from "../assets/image2.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5FBDA] text-[#450C3F] overflow-hidden">
      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <header className="relative z-30 border-b border-[#450C3F]/10 bg-[#F5FBDA]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#450C3F] flex items-center justify-center shadow-lg">
              <span className="text-[#F5FBDA] font-black text-xl">B</span>
            </div>

            <div>
              <h1 className="font-black tracking-tight text-lg">MR. BOB</h1>

              <p className="text-[11px] uppercase tracking-widest text-[#450C3F]/50">
                AI Interviewer
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#about"
              className="text-[#450C3F]/60 hover:text-[#450C3F] transition-colors"
            >
              About
            </a>

            <a
              href="#features"
              className="text-[#450C3F]/60 hover:text-[#450C3F] transition-colors"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-[#450C3F]/60 hover:text-[#450C3F] transition-colors"
            >
              How it works
            </a>
          </nav>

          {/* Small CTA */}
          <button
            onClick={() => navigate("/upload")}
            className="
              cursor-pointer
              hidden
              sm:flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-xl
              bg-[#450C3F]
              text-[#F5FBDA]
              text-sm
              font-semibold
              hover:bg-[#5C1554]
              transition-colors
            "
          >
            Start Interview
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative">
        {/* Decorative background shapes */}

        <div
          className="
            absolute
            -top-32
            -right-32
            w-[500px]
            h-[500px]
            rounded-full
            bg-[#D9EFBD]
            blur-3xl
            opacity-70
          "
        />

        <div
          className="
            absolute
            top-72
            -left-40
            w-[400px]
            h-[400px]
            rounded-full
            bg-[#B9D175]/30
            blur-3xl
          "
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_0.95fr] min-h-[650px] items-center">
            {/* ================= LEFT ================= */}

            <div className="py-20 lg:py-28 max-w-2xl">
              {/* Eyebrow */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-[#450C3F]
                  text-[#F5FBDA]
                  text-xs
                  font-bold
                  uppercase
                  tracking-widest
                "
              >
                <span className="w-2 h-2 rounded-full bg-[#B9D175]" />
                Technical Interview Practice
              </div>

              {/* Heading */}

              <h2
                className="
                  mt-7
                  text-5xl
                  sm:text-6xl
                  lg:text-7xl
                  font-black
                  tracking-[-0.04em]
                  leading-[0.95]
                "
              >
                Meet
                <span className="block">Mr. Bob.</span>
              </h2>

              {/* Description */}

              <p
                className="
                  mt-7
                  text-lg
                  sm:text-xl
                  leading-relaxed
                  text-[#450C3F]/65
                  max-w-xl
                "
              >
                Your personal AI technical interviewer who doesn't just ask
                questions — he listens, thinks, and challenges your answers.
              </p>

              {/* CTA */}

              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/upload")}
                  className="
                  cursor-pointer
                    group
                    flex
                    items-center
                    justify-center
                    gap-4
                    px-7
                    py-4
                    rounded-2xl
                    bg-[#450C3F]
                    text-[#F5FBDA]
                    font-bold
                    shadow-xl
                    shadow-[#450C3F]/20
                    hover:bg-[#5C1554]
                    hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >
                  <span>Proceed to Take Interview with Mr. Bob</span>

                  <span
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-[#B9D175]
                      text-[#450C3F]
                      flex
                      items-center
                      justify-center
                      group-hover:translate-x-1
                      transition-transform
                    "
                  >
                    <ArrowRight size={18} />
                  </span>
                </button>
              </div>

              {/* Trust points */}

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                <div className="flex items-center gap-2 text-sm text-[#450C3F]/60">
                  <CheckCircle2 size={16} />
                  Resume-aware
                </div>

                <div className="flex items-center gap-2 text-sm text-[#450C3F]/60">
                  <CheckCircle2 size={16} />
                  Adaptive questions
                </div>

                <div className="flex items-center gap-2 text-sm text-[#450C3F]/60">
                  <CheckCircle2 size={16} />
                  Voice conversation
                </div>
              </div>
            </div>

            {/* ================= RIGHT ================= */}

            <div className="relative h-full min-h-[600px] flex items-end justify-center">
              {/* Large background circle */}

              <div
                className="
                  absolute
                  bottom-20
                  right-0
                  w-[500px]
                  h-[500px]
                  rounded-full
                  bg-[#D9EFBD]
                "
              />

              {/* Inner circle */}

              <div
                className="
                  absolute
                  bottom-28
                  right-12
                  w-[400px]
                  h-[400px]
                  rounded-full
                  border
                  border-[#B9D175]
                  opacity-60
                "
              />
              <img
                src={mrBob}
                alt="Mr. Bob AI interviewer"
                className="
                  absolute
                  bottom-28
                  right-12
                  w-[400px]
                  h-[400px]
                  rounded-full
                  object-contain
                  drop-shadow-[0_30px_30px_rgba(69,12,63,0.15)]
                  hover:scale-[1.02]
                  transition-transform
                  duration-500
                "
              />

              {/* Decorative label */}

              <div
                className="
                  absolute
                  top-24
                  right-8
                  z-20
                  px-4
                  py-3
                  rounded-2xl
                  bg-white
                  shadow-xl
                  border
                  border-[#450C3F]/10
                  flex
                  items-center
                  gap-3
                "
              >
                <div className="w-9 h-9 rounded-xl bg-[#B9D175] flex items-center justify-center">
                  <Mic size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold">Voice Interview</p>

                  <p className="text-[10px] text-[#450C3F]/50">
                    Speak naturally
                  </p>
                </div>
              </div>

              {/* Bottom floating card */}

              <div
                className="
                  absolute
                  bottom-20
                  left-0
                  z-20
                  bg-[#450C3F]
                  text-[#F5FBDA]
                  rounded-2xl
                  px-5
                  py-4
                  shadow-2xl
                "
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#B9D175] animate-pulse" />

                  <div>
                    <p className="text-sm font-bold">Mr. Bob is ready</p>

                    <p className="text-xs text-[#F5FBDA]/50">
                      Senior Technical Interviewer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}
      <section id="features" className="bg-white border-y border-[#450C3F]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          {/* Heading */}

          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] font-black text-[#450C3F]/40">
              Why Mr. Bob?
            </p>

            <h3 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
              An interviewer who adapts.
            </h3>

            <p className="mt-5 text-lg text-[#450C3F]/60 leading-relaxed">
              Every conversation is different because Mr. Bob responds to what
              you actually say.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {/* Resume */}

            <div
              className="
                group
                rounded-3xl
                p-7
                bg-[#F5FBDA]
                border
                border-[#450C3F]/10
                hover:-translate-y-2
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              <div
                className="
                  w-13
                  h-13
                  w-12
                  rounded-2xl
                  bg-[#450C3F]
                  text-[#F5FBDA]
                  flex
                  items-center
                  justify-center
                "
              >
                <FileText size={22} />
              </div>

              <h4 className="mt-6 text-xl font-bold">Resume-aware</h4>

              <p className="mt-3 text-[#450C3F]/60 leading-relaxed">
                Mr. Bob reads your resume and asks questions about your actual
                projects, skills and experience.
              </p>
            </div>

            {/* Adaptive */}

            <div
              className="
                group
                rounded-3xl
                p-7
                bg-[#D9EFBD]
                border
                border-[#450C3F]/10
                hover:-translate-y-2
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#450C3F]
                  text-[#F5FBDA]
                  flex
                  items-center
                  justify-center
                "
              >
                <Brain size={22} />
              </div>

              <h4 className="mt-6 text-xl font-bold">Adaptive questioning</h4>

              <p className="mt-3 text-[#450C3F]/60 leading-relaxed">
                Give a strong answer and Mr. Bob can dig deeper. Struggle with a
                topic and he can change direction.
              </p>
            </div>

            {/* Voice */}

            <div
              className="
                group
                rounded-3xl
                p-7
                bg-[#B9D175]/50
                border
                border-[#450C3F]/10
                hover:-translate-y-2
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#450C3F]
                  text-[#F5FBDA]
                  flex
                  items-center
                  justify-center
                "
              >
                <Mic size={22} />
              </div>

              <h4 className="mt-6 text-xl font-bold">Voice-first</h4>

              <p className="mt-3 text-[#450C3F]/60 leading-relaxed">
                Talk through your ideas naturally instead of typing answers into
                a form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT MR BOB
      ====================================================== */}
      <section id="about" className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}

          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-[#D9EFBD]
                text-sm
                font-bold
              "
            >
              <Sparkles size={15} />
              Meet your interviewer
            </div>

            <h3
              className="
                mt-6
                text-4xl
                sm:text-5xl
                font-black
                leading-tight
                tracking-tight
              "
            >
              Not just another
              <span className="block">question generator.</span>
            </h3>
          </div>

          {/* Right */}

          <div className="space-y-5 text-lg text-[#450C3F]/65 leading-relaxed">
            <p>
              <strong className="text-[#450C3F]">Mr. Bob</strong> is designed to
              behave like an experienced technical interviewer rather than a
              static list of questions.
            </p>

            <p>
              He starts with your resume to understand your background, projects
              and technical experience.
            </p>

            <p>
              During the interview, your answers influence what comes next. Mr.
              Bob can explore implementation decisions, architecture, debugging,
              trade-offs, scalability and the reasoning behind your choices.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section id="how-it-works" className="bg-[#450C3F] text-[#F5FBDA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] font-black text-[#B9D175]">
              The process
            </p>

            <h3 className="mt-4 text-4xl sm:text-5xl font-black">
              Three steps. One real conversation.
            </h3>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            {/* Step 1 */}

            <div>
              <span className="text-7xl font-black text-[#B9D175]/20">01</span>

              <div className="mt-4 flex items-center gap-3">
                <FileText size={20} className="text-[#B9D175]" />

                <h4 className="text-xl font-bold">Upload your resume</h4>
              </div>

              <p className="mt-4 text-[#F5FBDA]/55 leading-relaxed">
                Your resume gives Mr. Bob the context he needs to personalize
                your interview.
              </p>
            </div>

            {/* Step 2 */}

            <div>
              <span className="text-7xl font-black text-[#B9D175]/20">02</span>

              <div className="mt-4 flex items-center gap-3">
                <MessageSquare size={20} className="text-[#B9D175]" />

                <h4 className="text-xl font-bold">Meet Mr. Bob</h4>
              </div>

              <p className="mt-4 text-[#F5FBDA]/55 leading-relaxed">
                Start your interview and answer questions about your experience,
                projects and technical decisions.
              </p>
            </div>

            {/* Step 3 */}

            <div>
              <span className="text-7xl font-black text-[#B9D175]/20">03</span>

              <div className="mt-4 flex items-center gap-3">
                <Brain size={20} className="text-[#B9D175]" />

                <h4 className="text-xl font-bold">Think. Explain. Improve.</h4>
              </div>

              <p className="mt-4 text-[#F5FBDA]/55 leading-relaxed">
                Mr. Bob follows your reasoning and challenges you with relevant
                follow-up questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="px-6 lg:px-10 py-24">
        <div
          className="
            relative
            max-w-7xl
            mx-auto
            overflow-hidden
            rounded-[2.5rem]
            bg-[#D9EFBD]
            px-8
            sm:px-14
            py-16
            text-center
          "
        >
          {/* Background decoration */}

          <div
            className="
              absolute
              -top-40
              -right-40
              w-96
              h-96
              rounded-full
              bg-[#B9D175]/50
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-40
              -left-40
              w-96
              h-96
              rounded-full
              bg-[#B9D175]/30
              blur-3xl
            "
          />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.2em] font-black text-[#450C3F]/45">
              Your turn
            </p>

            <h3 className="mt-4 text-4xl sm:text-5xl font-black">
              Ready to face Mr. Bob?
            </h3>

            <p className="mt-5 max-w-xl mx-auto text-lg text-[#450C3F]/60">
              Bring your resume. Bring your experience. Let's see how you think.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="
                group
                mt-9
                inline-flex
                items-center
                gap-4
                px-7
                py-4
                rounded-2xl
                bg-[#450C3F]
                text-[#F5FBDA]
                font-bold
                shadow-xl
                hover:bg-[#5C1554]
                hover:-translate-y-1
                transition-all
                duration-300
                cursor-pointer
              "
            >
              Proceed to Take Interview with Mr. Bob
              <span
                className="
                  w-9
                  h-9
                  rounded-xl
                  bg-[#B9D175]
                  text-[#450C3F]
                  flex
                  items-center
                  justify-center
                  group-hover:translate-x-1
                  transition-transform
                "
              >
                <ArrowRight size={18} />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="border-t border-[#450C3F]/10">
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            lg:px-10
            py-8
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-4
          "
        >
          <div>
            <p className="font-black">MR. BOB</p>

            <p className="text-sm text-[#450C3F]/45">
              Your AI technical interviewer.
            </p>
          </div>

          <p className="text-sm text-[#450C3F]/40">
            Practice smarter. Interview better.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
