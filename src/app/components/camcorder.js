"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, Heart, Send } from "lucide-react";

export default function CamcorderOverlay() {
  const [time, setTime] = useState(new Date());
  const [recordingTime, setRecordingTime] = useState(0);
  const [phase, setPhase] = useState("normal");
  const [activeTexts, setActiveTexts] = useState([]);
  const timeouts = useRef([]);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Configure your timed text popups here
  const timedTexts = [
    {
      id: 0,
      text: "Your League",
      startTime: 0,
      duration: 4,
      className:
        "text-[#E6E6FA] text-6xl font-playfair font-bold top-1/4 left-1/2 -translate-x-1/2 animate-pulse drop-shadow-md",
    },
    {
      id: 1,
      text: "In Review",
      startTime: 1,
      duration: 4,
      className:
        "text-[#FFD1DC] underline text-6xl font-playfair font-bold top-2/4 left-1/2 -translate-x-1/2 animate-pulse drop-shadow-md",
    },
    {
      id: 2,
      text: "Golden Stats",
      startTime: 2,
      duration: 4,
      className:
        "text-[#FFFACD] text-6xl font-playfair font-bold top-3/4 left-1/2 -translate-x-1/2 animate-pulse drop-shadow-md",
    },
    {
      id: 3,
      text: "Peach Highlights",
      startTime: 3,
      duration: 4,
      className:
        "text-[#F4A261] text-6xl font-playfair font-bold top-[85%] left-1/2 -translate-x-1/2 animate-pulse drop-shadow-md",
    },
    {
      id: 4,
      text: "Olive Whisper",
      startTime: 4,
      duration: 4,
      className:
        "text-[#A5B299] text-6xl font-playfair font-bold top-[95%] left-1/2 -translate-x-1/2 animate-pulse drop-shadow-md",
    },

    {
      id: 5,
      text: "1987 ✨",
      startTime: 8,
      duration: 2,
      className:
        "text-pink-400 text-5xl font-black bottom-1/3 right-10 rotate-12",
    },
    {
      id: 6,
      text: "Forever in our hearts",
      startTime: 12,
      duration: 4,
      className:
        "text-white text-3xl font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 px-4 py-2 rounded-lg",
    },
  ];

  useEffect(() => {
    const playAudio = () => {
      audioRef.current?.play().catch(() => {
        const playOnInteraction = () => {
          audioRef.current?.play().catch(() => {});
          document.removeEventListener("click", playOnInteraction);
          document.removeEventListener("touchstart", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction);
        document.addEventListener("touchstart", playOnInteraction);
      });
    };

    playAudio();

    // tickers
    const timer = window.setInterval(() => {
      setTime(new Date());
      setRecordingTime((p) => p + 1);
    }, 1000);

    timeouts.current.push(window.setTimeout(() => setPhase("switch"), 3000));
    timeouts.current.push(
      window.setTimeout(() => {
        setPhase("video");
        videoRef.current?.play().catch(() => {});
      }, 3150)
    );

    // Schedule timed text popups
    timedTexts.forEach((textConfig) => {
      // Show text
      const showTimeout = window.setTimeout(() => {
        setActiveTexts((prev) => [...prev, textConfig.id]);
      }, textConfig.startTime * 1000);

      // Hide text
      const hideTimeout = window.setTimeout(
        () => {
          setActiveTexts((prev) => prev.filter((id) => id !== textConfig.id));
        },
        (textConfig.startTime + textConfig.duration) * 1000
      );

      timeouts.current.push(showTimeout, hideTimeout);
    });

    return () => {
      clearInterval(timer);
      timeouts.current.forEach((t) => clearTimeout(t));
      timeouts.current = [];
    };
  }, []);

  const formatRecordingTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const formatDate = () => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return `${months[time.getMonth()]}.${String(time.getDate()).padStart(2, "0")}:1987`;
  };

  const formatClock = () => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${ampm} ${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  return (
    <div className="h-screen font-vt w-full bg-gray-100 flex items-center justify-center p-5">
      <audio ref={audioRef} src="/bgm.mp3" loop />

      <div className="relative w-full max-w-md h-full overflow-hidden rounded-md">
        <img
          src="/startingbg.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <video
          ref={videoRef}
          className={[
            "absolute inset-0 w-full h-full object-cover",
            "transition-opacity duration-500",
            phase === "video" ? "opacity-100" : "opacity-0",
          ].join(" ")}
          src="/macro.mp4"
          playsInline
          muted
          loop
          preload="auto"
        />

        <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
          <div className="flex-1 h-1 bg-black/30 rounded-full"></div>
          <div className="flex-1 h-1 bg-black/30 rounded-full"></div>
          <div className="flex-1 h-1 bg-black/30 rounded-full"></div>
        </div>

        <div className="absolute top-8 left-0 right-0 z-10 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-black font-semibold text-sm"></span>
              <span className="text-black/70 text-xs">1s ago</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-black">
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pb-6">
          <div className="flex gap-3">
            <button className="transition-transform text-black active:scale-90">
              <Heart className="w-7 h-7 text-black stroke-1" />
            </button>

            <button className="transition-transform active:scale-90">
              <Send className="w-7 h-7 text-black stroke-1" />
            </button>
          </div>
        </div>

        <div className="relative w-full h-screen overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              animation: "grain 0.2s steps(10) infinite",
            }}
          />

          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-15 left-5 text-green-400 text-sm font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
            >
              CAM
            </div>

            <div className="absolute top-15 right-4 flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse" />
                <span
                  className="text-white text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
                >
                  REC
                </span>
              </div>
              <div
                className="text-white text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
              >
                -{formatRecordingTime(recordingTime)}
              </div>
            </div>

            <div
              className="absolute bottom-30 left-4 text-white text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
            >
              {formatDate()}
            </div>

            <div
              className="absolute bottom-30 right-4 text-white text-sm font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
            >
              {formatClock()}
            </div>

            {timedTexts.map(
              (textConfig) =>
                activeTexts.includes(textConfig.id) && (
                  <div
                    key={textConfig.id}
                    className={`absolute transition-all duration-500 ${textConfig.className}`}
                    style={{
                      textShadow: "2px 2px 4px rgba(0,0,0,0.9)",
                    }}
                  >
                    {textConfig.text}
                  </div>
                )
            )}
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            @keyframes grain {
              0%,
              100% {
                transform: translate(0, 0);
              }
              10% {
                transform: translate(-5%, -10%);
              }
              20% {
                transform: translate(-15%, 5%);
              }
              30% {
                transform: translate(7%, -25%);
              }
              40% {
                transform: translate(-5%, 25%);
              }
              50% {
                transform: translate(-15%, 10%);
              }
              60% {
                transform: translate(15%, 0%);
              }
              70% {
                transform: translate(0%, 15%);
              }
              80% {
                transform: translate(3%, 25%);
              }
              90% {
                transform: translate(-10%, 10%);
              }
            }
          `}</style>
        </div>

        <div className="absolute inset-0 flex">
          <div className="flex-1 cursor-pointer"></div>
          <div className="flex-1 cursor-pointer"></div>
        </div>

        <div
          className={[
            "pointer-events-none absolute inset-0 z-50",
            "transition-opacity duration-150 ease-in",
            phase === "switch" ? "bg-black opacity-100" : "opacity-0",
          ].join(" ")}
        />

        <div
          className={[
            "pointer-events-none absolute inset-0 z-50 mix-blend-screen",
            "bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_2px,transparent_3px)]",
            "transition-opacity duration-150 ease-in",
            phase === "switch" ? "opacity-40" : "opacity-0",
          ].join(" ")}
        />
      </div>
    </div>
  );
}
