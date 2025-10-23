"use client";

import { Heart, Send, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MacroStats() {
  return (
    <div className="h-screen w-full font-vt bg-gray-100 flex items-center justify-center p-5">
      <div className="relative w-full justify-center items-center max-w-md border-1 bg-gray-50 h-full bg-gradient-to-br overflow-hidden rounded-md">
        {/* Top progress bars */}
        <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
          <div className="flex-1 h-1 bg-gray-600/30 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-600/30 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-600/30 rounded-full"></div>
        </div>

        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/macro.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Spawn-in text */}
        <motion.div
          className="absolute inset-0 z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.8 },
            },
          }}
        >
          {/* Top Left */}
          <motion.span
            className="absolute top-24 left-6 text-white text-5xl underline font-bold drop-shadow-lg"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
            }}
          >
            This Year’s
          </motion.span>

          {/* Top Right */}
          <motion.span
            className="absolute top-70 right-40 text-blue-600 text-6xl font-bold drop-shadow-lg"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
            }}
          >
            Macro
          </motion.span>

          {/* Bottom Center */}
          <motion.span
            className="absolute bottom-30 left-1/2 -translate-x-1/2 text-white text-6xl font-bold drop-shadow-lg"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
            }}
          >
            In Review
          </motion.span>
        </motion.div>

        {/* Header bar */}
        <div className="absolute top-8 left-0 right-0 z-20 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-black font-semibold text-lg">@riftrewind</span>
              <span className="text-gray-600/70 text-xs">1s ago</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-gray-600">
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom icons */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-6">
          <div className="flex gap-3">
            <button className="transition-transform text-black active:scale-90">
              <Heart className="w-7 h-7 text-gray-600 stroke-1" />
            </button>
            <button className="transition-transform active:scale-90">
              <Send className="w-7 h-7 text-gray-600 stroke-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
