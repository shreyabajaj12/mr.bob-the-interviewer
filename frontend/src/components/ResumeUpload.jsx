import { useState } from "react";
import {
  Upload,
  FileText,
  FileType,
  CheckCircle2,
  X,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// PDF worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const ResumeUpload = () => {
  const navigate =useNavigate();

  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // EXTRACT TEXT FROM PDF
  // =====================================================

  const extractPdfText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let text = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");

      text += pageText + "\n\n";
    }

    return text.trim();
  };

  // =====================================================
  // EXTRACT TEXT FROM DOCX
  // =====================================================

  const extractDocxText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer,
    });

    return result.value.trim();
  };

  // =====================================================
  // EXTRACT TEXT FROM TXT
  // =====================================================

  const extractTxtText = async (file) => {
    const text = await file.text();

    return text.trim();
  };

  // =====================================================
  // PROCESS FILE
  // =====================================================

  const processFile = async (selectedFile) => {
    setError("");
    setResumeText("");
    setFile(null);

    if (!selectedFile) {
      return;
    }

    // Check file type

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    const allowedExtensions = ["pdf", "docx", "txt"];

    if (
      !allowedTypes.includes(selectedFile.type) &&
      !allowedExtensions.includes(fileExtension)
    ) {
      setError("Please upload a PDF, DOCX, or TXT file.");
      return;
    }

    // Check file size - 10MB

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      return;
    }

    setFile(selectedFile);
    setIsExtracting(true);

    try {
      let extractedText = "";

      if (fileExtension === "pdf") {
        extractedText = await extractPdfText(selectedFile);
      } else if (fileExtension === "docx") {
        extractedText = await extractDocxText(selectedFile);
      } else if (fileExtension === "txt") {
        extractedText = await extractTxtText(selectedFile);
      }

      if (!extractedText) {
        setError(
          "We couldn't extract any text from this file. Please try another resume.",
        );

        setFile(null);
        return;
      }

      setResumeText(extractedText);
    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong while reading the resume. Please try again.",
      );

      setFile(null);
    } finally {
      setIsExtracting(false);
    }
  };

  // =====================================================
  // FILE INPUT
  // =====================================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    processFile(selectedFile);
  };

  // =====================================================
  // DRAG & DROP
  // =====================================================

  const handleDrop = (event) => {
    event.preventDefault();

    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    processFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // =====================================================
  // REMOVE FILE
  // =====================================================

  const removeFile = () => {
    setFile(null);
    setResumeText("");
    setError("");
  };

  // =====================================================
  // START INTERVIEW
  // =====================================================
  const [isStarting, setIsStarting] = useState(false);

  const startInterview = async() => {
    if (!resumeText || isStarting) {
      return;
    }
    setIsStarting(true);

    try{
      const response =await axios.post(
        "http://localhost:8000/api/interview/start",
        {
          resumeText:resumeText,
        },
        {
          withCredentials:true,
        }
      );
      console.log("start interview response:",response.data);
      navigate("/interview")
    }catch(error){
        console.error("failed interview response:",error);
        setError(
          error.response?.data?.error || 
          "failed to start interview. please try again."
        )
    }
    setIsStarting(false);
  };

  return (
    <div className="min-h-screen bg-[#F5FBDA] text-[#450C3F]">
      {/* =================================================
          NAVBAR
      ================================================== */}

      <header className="border-b border-[#450C3F]/10">
        <div
          className="
          max-w-6xl
          mx-auto
          px-6
          h-20
          flex
          items-center
          justify-between
        "
        >
          {/* Logo */}

          <div className="flex items-center gap-3">
            <div
              className="
              w-10
              h-10
              rounded-xl
              bg-[#450C3F]
              flex
              items-center
              justify-center
            "
            >
              <span
                className="
                text-[#F5FBDA]
                font-black
                text-lg
              "
              >
                B
              </span>
            </div>

            <div>
              <h1 className="font-black">MR. BOB</h1>

              <p
                className="
                text-[10px]
                uppercase
                tracking-widest
                text-[#450C3F]/45
              "
              >
                AI Interviewer
              </p>
            </div>
          </div>

          {/* Step indicator */}

          <div
            className="
            hidden
            sm:flex
            items-center
            gap-2
            text-sm
            text-[#450C3F]/50
          "
          >
            <span
              className="
              w-7
              h-7
              rounded-full
              bg-[#450C3F]
              text-[#F5FBDA]
              flex
              items-center
              justify-center
              text-xs
              font-bold
            "
            >
              1
            </span>

            <span className="font-semibold text-[#450C3F]">Resume</span>

            <span className="mx-2">→</span>

            <span
              className="
              w-7
              h-7
              rounded-full
              border
              border-[#450C3F]/20
              flex
              items-center
              justify-center
              text-xs
            "
            >
              2
            </span>

            <span>Interview</span>
          </div>
        </div>
      </header>

      {/* =================================================
          MAIN
      ================================================== */}

      <main className="max-w-5xl mx-auto px-6 py-14 lg:py-20">
        {/* Heading */}

        <div className="text-center max-w-2xl mx-auto">
          <div
            className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-[#D9EFBD]
            text-xs
            font-bold
            uppercase
            tracking-widest
          "
          >
            <FileText size={14} />
            Step 1 · Your Resume
          </div>

          <h2
            className="
            mt-6
            text-4xl
            sm:text-5xl
            font-black
            tracking-tight
          "
          >
            Give Mr. Bob
            <span className="block">something to work with.</span>
          </h2>

          <p
            className="
            mt-5
            text-lg
            text-[#450C3F]/60
            leading-relaxed
          "
          >
            Upload your resume and Mr. Bob will use your experience, projects
            and skills to personalize your technical interview.
          </p>
        </div>

        {/* =================================================
            UPLOAD AREA
        ================================================== */}

        <div className="mt-12">
          {!file ? (
            <label
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                relative
                block
                cursor-pointer
                rounded-[2rem]
                border-2
                border-dashed
                p-10
                sm:p-16
                text-center
                transition-all
                duration-300

                ${
                  isDragging
                    ? "border-[#450C3F] bg-[#D9EFBD]"
                    : "border-[#450C3F]/20 bg-white/60 hover:border-[#450C3F]/40 hover:bg-white"
                }
              `}
            >
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Upload icon */}

              <div
                className="
                mx-auto
                w-20
                h-20
                rounded-3xl
                bg-[#450C3F]
                text-[#F5FBDA]
                flex
                items-center
                justify-center
                shadow-xl
              "
              >
                <Upload size={30} />
              </div>

              <h3
                className="
                mt-7
                text-2xl
                font-bold
              "
              >
                Drop your resume here
              </h3>

              <p
                className="
                mt-2
                text-[#450C3F]/50
              "
              >
                or click to browse your files
              </p>

              {/* Supported formats */}

              <div
                className="
                mt-7
                flex
                flex-wrap
                justify-center
                gap-3
              "
              >
                <span
                  className="
                  px-4
                  py-2
                  rounded-xl
                  bg-[#F5FBDA]
                  border
                  border-[#450C3F]/10
                  text-sm
                  font-semibold
                "
                >
                  PDF
                </span>

                <span
                  className="
                  px-4
                  py-2
                  rounded-xl
                  bg-[#F5FBDA]
                  border
                  border-[#450C3F]/10
                  text-sm
                  font-semibold
                "
                >
                  DOCX
                </span>

                <span
                  className="
                  px-4
                  py-2
                  rounded-xl
                  bg-[#F5FBDA]
                  border
                  border-[#450C3F]/10
                  text-sm
                  font-semibold
                "
                >
                  TXT
                </span>
              </div>

              <p
                className="
                mt-5
                text-xs
                text-[#450C3F]/40
              "
              >
                Maximum file size: 10 MB
              </p>
            </label>
          ) : (
            /* =============================================
               FILE SELECTED
            ============================================== */

            <div
              className="
              rounded-[2rem]
              bg-white
              border
              border-[#450C3F]/10
              p-6
              shadow-lg
            "
            >
              <div
                className="
                flex
                items-center
                justify-between
                gap-4
              "
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="
                    w-14
                    h-14
                    shrink-0
                    rounded-2xl
                    bg-[#D9EFBD]
                    flex
                    items-center
                    justify-center
                  "
                  >
                    <FileType size={25} className="text-[#450C3F]" />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                      font-bold
                      truncate
                    "
                    >
                      {file.name}
                    </p>

                    <p
                      className="
                      text-sm
                      text-[#450C3F]/45
                      mt-1
                    "
                    >
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  onClick={removeFile}
                  className="
                    shrink-0
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-[#450C3F]/40
                    hover:bg-[#450C3F]/5
                    hover:text-[#450C3F]
                    transition
                  "
                >
                  <X size={20} />
                </button>
              </div>

              {/* Extraction status */}

              <div
                className="
                mt-6
                pt-5
                border-t
                border-[#450C3F]/10
              "
              >
                {isExtracting ? (
                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    text-sm
                  "
                  >
                    <Loader2 size={18} className="animate-spin" />

                    <span>Reading your resume...</span>
                  </div>
                ) : (
                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    font-semibold
                  "
                  >
                    <CheckCircle2 size={18} className="text-[#6B8035]" />
                    Resume successfully processed
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================== */}

          {error && (
            <div
              className="
              mt-5
              p-4
              rounded-2xl
              bg-red-50
              border
              border-red-200
              text-red-700
              flex
              items-start
              gap-3
            "
            >
              <AlertCircle size={20} className="shrink-0 mt-0.5" />

              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* =================================================
            EXTRACTED TEXT
        ================================================== */}

        {resumeText && !isExtracting && (
          <section className="mt-10">
            <div
              className="
              flex
              flex-col
              sm:flex-row
              sm:items-end
              justify-between
              gap-3
              mb-4
            "
            >
              <div>
                <p
                  className="
                  text-xs
                  uppercase
                  tracking-widest
                  font-black
                  text-[#450C3F]/40
                "
                >
                  Resume Preview
                </p>

                <h3
                  className="
                  mt-1
                  text-2xl
                  font-bold
                "
                >
                  Extracted information
                </h3>
              </div>

              <p
                className="
                text-xs
                text-[#450C3F]/40
              "
              >
                Review the extracted text before continuing
              </p>
            </div>

            {/* Text box */}

            <div
              className="
              rounded-[2rem]
              bg-white
              border
              border-[#450C3F]/10
              shadow-lg
              overflow-hidden
            "
            >
              {/* Header */}

              <div
                className="
                px-6
                py-4
                bg-[#D9EFBD]
                border-b
                border-[#450C3F]/10
                flex
                items-center
                justify-between
              "
              >
                <div className="flex items-center gap-2">
                  <FileText size={17} />

                  <span className="text-sm font-bold">Resume text</span>
                </div>

                <span
                  className="
                  text-xs
                  text-[#450C3F]/50
                "
                >
                  {resumeText.length.toLocaleString()} characters
                </span>
              </div>

              {/* Text */}

              <textarea
                value={resumeText}
                onChange={(event) => setResumeText(event.target.value)}
                className="
                  w-full
                  min-h-[350px]
                  max-h-[550px]
                  resize-y
                  p-6
                  bg-white
                  text-[#450C3F]/80
                  text-sm
                  leading-7
                  outline-none
                  font-mono
                "
              />
            </div>

            {/* =================================================
                START INTERVIEW
            ================================================== */}

            <div
              className="
              mt-8
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-5
              p-5
              sm:p-6
              rounded-3xl
              bg-[#450C3F]
              text-[#F5FBDA]"
            >
              <div>
                <p className="font-bold">Your resume is ready.</p>

                <p
                  className="
                  mt-1
                  text-sm
                  text-[#F5FBDA]/55
                "
                >
                  Mr. Bob is waiting to meet you.
                </p>
              </div>

              <button
                onClick={startInterview}
                disabled={isStarting}
                className="
                cursor-pointer
                  group
                  w-full
                  sm:w-auto
                  flex
                  items-center
                  justify-center
                  gap-3
                  px-6
                  py-3.5
                  rounded-2xl
                  bg-[#B9D175]
                  text-[#450C3F]
                  font-bold
                  hover:bg-[#C8DF8C]
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >
                Start Interview
                <ArrowRight
                  size={18}
                  className="
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </button>
            </div>
          </section>
        )}

        {/* =================================================
            INFO
        ================================================== */}

        {!resumeText && (
          <div
            className="
            mt-8
            grid
            sm:grid-cols-3
            gap-4
          "
          >
            <div
              className="
              p-5
              rounded-2xl
              bg-[#D9EFBD]/60
            "
            >
              <FileText size={20} />

              <p className="mt-3 font-bold text-sm">Resume-aware</p>

              <p
                className="
                mt-1
                text-xs
                text-[#450C3F]/55
                leading-relaxed
              "
              >
                Mr. Bob asks questions based on your actual experience.
              </p>
            </div>

            <div
              className="
              p-5
              rounded-2xl
              bg-[#B9D175]/40
            "
            >
              <FileType size={20} />

              <p className="mt-3 font-bold text-sm">Multiple formats</p>

              <p
                className="
                mt-1
                text-xs
                text-[#450C3F]/55
                leading-relaxed
              "
              >
                Upload PDF, Word or plain text resumes.
              </p>
            </div>

            <div
              className="
              p-5
              rounded-2xl
              bg-white
              border
              border-[#450C3F]/10
            "
            >
              <CheckCircle2 size={20} />

              <p className="mt-3 font-bold text-sm">Review first</p>

              <p
                className="
                mt-1
                text-xs
                text-[#450C3F]/55
                leading-relaxed
              "
              >
                Check and edit the extracted text before starting.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResumeUpload;
