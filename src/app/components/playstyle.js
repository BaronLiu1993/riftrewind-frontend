"use client";

import { Heart, Send, Volume2 } from "lucide-react";

import { ScatterChart } from "@mui/x-charts";
import { useSeries, useXScale, useYScale } from "@mui/x-charts/hooks";
import { ChartsClipPath } from "@mui/x-charts/ChartsClipPath";
import useId from "@mui/utils/useId";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { rainbowSurgePalette } from "@mui/x-charts/colorPalettes";

function RegressionLine({ seriesId }) {
  const theme = useTheme();
  const palette = rainbowSurgePalette(theme.palette.mode);
  const stroke = palette[2];
  const allSeries = useSeries();
  const series = allSeries.scatter.series[seriesId];
  const xScale = useXScale(series.xAxisId);
  const yScale = useYScale(series.yAxisId);
  const clipPathId = `linear-regression-clip-${useId()}`;

  const { m, b } = linearRegression(series.data ?? []);

  const xDomain = xScale.domain();
  const x1 = xScale(xDomain[0]);
  const x2 = xScale(xDomain[1]);
  const y1 = yScale(m * xDomain[0] + b);
  const y2 = yScale(m * xDomain[1] + b);

  return (
    <>
      <ChartsClipPath id={clipPathId} />
      <g clipPath={`url(#${clipPathId})`}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={2} />
      </g>
    </>
  );
}

function linearRegression(points) {
  const n = points.length;

  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0;

  for (let i = 0; i < n; i += 1) {
    const x = points[i].x;
    const y = points[i].y;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  }
  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - m * sumX) / n;

  return { m, b };
}

export default function PlaystyleScreen({ scatterData }) {
  console.log(scatterData);
  return (
    <div className="h-screen w-full font-lexend bg-gray-100 flex items-center justify-center p-5">
      <div className="relative w-full flex flex-col items-center justify-center max-w-md border-1 bg-gray-50 h-full bg-gradient-to-br overflow-hidden rounded-md">
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
                Jerrbear
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
        <div className="px-10">
          <h1>Relation between Composite Micro vs Macro Scores</h1>
          <ScatterChart
            height={300}
            xAxis={[{ label: "Macro Score" }]}
            yAxis={[
              {
                label: "Micro Score",
                min: -1,
              },
            ]}
            series={[
              {
                id: "league",
                label: "Matches",
                data: scatterData.map((v) => ({
                  x: v.micro_score,
                  y: v.macro_score,
                })),
              },
            ]}
          >
            <RegressionLine seriesId="league" />
          </ScatterChart>
          
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
