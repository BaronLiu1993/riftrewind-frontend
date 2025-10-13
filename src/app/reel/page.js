import { Textarea } from "@/components/ui/textarea";
import { ChartArea } from "lucide-react";
import PlaystyleScreen from "../components/playstyle";
import MacroScreen from "../components/macroplay";

export default async function Reel({ puuid }) {
  const macro = await fetch("http://127.0.0.1:3000/macrodata", {
    method: "POST",
    body: JSON.stringify({
      puuid:
        "jzdg2rwr6k16dsjfalqjeixnhaa_yyffhr0xdpwqbzqieai2rpb4npjpd2zw_iibav31xmrtrz4p6g",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const macrodata = await macro.json();

  return (
    <>
      <MacroScreen macrodata={macrodata} />
    </>
  );
}
