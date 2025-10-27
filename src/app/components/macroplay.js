"use client";
import { Heart, Send, Volume2 } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function MacroScreen({ macrodata, qualitativeData,  quantitativeData}) {
  const newMacroData = macrodata[0];

  return (
    <div className="h-screen w-full font-lexend bg-gray-100 flex items-center justify-center p-5">
      <div className="relative w-full max-w-md border-1 bg-gray-50 h-full bg-gradient-to-br overflow-hidden rounded-md">
        <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
          <div className="flex-1 h-1 bg-gray-600/30 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-600/30 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-600/30 rounded-full"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center"></div>

        <div className="absolute top-8 left-0 right-0 z-10 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold text-sm">
                {newMacroData.player_name}
              </span>
              <span className="text-gray-600/70 text-xs">1s ago</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-gray-600">
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
          <div className="font-playfair">
            <TypeAnimation
              sequence={["Your Macro Wrapped"]}
              wrapper="span"
              speed={50}
              cursor={false}
              style={{ fontSize: "2em", display: "inline-block" }}
            />
            <div className = "p-2 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl h-2 w-2 bg-blue-400"></div>
                <div className="flex flex-col gap-1">
                  <h1>Coordinated Kills</h1>
                  <span className="text-2xl">
                    {newMacroData.coordinated_kills}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-2xl h-2 w-2 bg-blue-400"></div>
                <div className="flex flex-col gap-1">
                  <h1>Kill Participation</h1>
                  <span className="text-2xl">
                    {newMacroData.kill_participation}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-2xl h-2 w-2 bg-blue-400"></div>
                <div className="flex flex-col gap-1">
                  <h1>Turret Takedowns</h1>
                  <span className="text-2xl">
                    {newMacroData.turret_takedowns}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-2xl h-2 w-2 bg-blue-400"></div>

                <div className="flex flex-col gap-1">
                  <h1>Vision Effectiveness Per Minute</h1>
                  <span className="text-2xl">
                    {newMacroData.ward_actions_per_min}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl">
                <div className="rounded-2xl h-2 w-2 bg-blue-400"></div>
                <div className="flex flex-col gap-1">
                  <h1>Objective Shares</h1>
                  <span className="text-2xl">
                    {newMacroData.epic_obj_share * 100} %
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pb-6">
          <div className="flex  gap-3">
            <button className="transition-transform text-black active:scale-90">
              <Heart className="w-7 h-7 text-gray-600 stroke-1" />
            </button>

            <button className="transition-transform active:scale-90">
              <Send className="w-7 h-7 text-gray-600 stroke-1" />
            </button>
          </div>
        </div>

        <div className="absolute inset-0 flex">
          <div className="flex-1 cursor-pointer"></div>
          <div className="flex-1 cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
}
