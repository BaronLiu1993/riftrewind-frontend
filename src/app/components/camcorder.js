"use client";

import { useState, useEffect } from "react";
import { Volume2, Heart, Send } from "lucide-react";
import Image from "next/image";

export default function CamcorderOverlay() {
  const [time, setTime] = useState(new Date());
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatRecordingTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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
    <div className="h-screen w-full font-lexend bg-gray-100 flex items-center justify-center p-5">
      <div className="relative w-full justify-center items-center max-w-md border-1 bg-gray-50 h-full bg-gradient-to-br overflow-hidden rounded-md">
      <Image
          src="/startingbg.png"         
          alt="Background"
          fill                       
          className=""  
          priority
        />
        
        <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
          <div className="flex-1 h-1 bg-black/30 rounded-full"></div>
          <div className="flex-1 h-1 bg-black/30 rounded-full"></div>
          <div className="flex-1 h-1 bg-black/30 rounded-full"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center"></div>

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
          <div className="flex  gap-3">
            <button className="transition-transform text-black active:scale-90">
              <Heart className="w-7 h-7 text-black stroke-1" />
            </button>

            <button className="transition-transform active:scale-90">
              <Send className="w-7 h-7 text-black stroke-1" />
            </button>
          </div>
        </div>

        <div className="relative w-full h-screen bg-gradient-to-br overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              animation: "grain 0.2s steps(10) infinite",
            }}
          ></div>

          <div className="absolute inset-0 pointer-events-none font-vt">
            <div
              className="absolute top-15 left-5 text-green-400 text-4xl font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
            >
              CAM
            </div>

            <div className="absolute top-15 right-4 flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                <span
                  className="text-white text-4xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
                >
                  REC
                </span>
              </div>
              <div
                className="text-white text-xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
              >
                -{formatRecordingTime(recordingTime)}
              </div>
            </div>

            <div
              className="absolute bottom-30 left-4 text-white text-4xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
            >
              {formatDate()}
            </div>

            <div
              className="absolute bottom-30 right-4 text-white text-4xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.8)" }}
            >
              {formatClock()}
            </div>

            
          </div>

          

          <style jsx>{`
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
      </div>
    </div>
  );
}
