import { Textarea } from "@/components/ui/textarea";
import { ChartArea } from "lucide-react";
import PlaystyleScreen from "../components/playstyle";
import MacroScreen from "../components/macroplay";

export default async function Reel({ puuid }) {
  const macroResponse = await fetch("http://127.0.0.1:8000/macrodata", {
    method: "POST",
    body: JSON.stringify({
      puuid:
        "jzdg2rwr6k16dsjfalqjeixnhaa_yyffhr0xdpwqbzqieai2rpb4npjpd2zw_iibav31xmrtrz4p6g",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const qualitativeResponse = await fetch(
    "http://127.0.0.1:8000/graphs/qualitative",
    {
      method: "POST",
      body: JSON.stringify({
        puuid:
          "jzdg2rwr6k16dsjfalqjeixnhaa_yyffhr0xdpwqbzqieai2rpb4npjpd2zw_iibav31xmrtrz4p6g",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const quantitativeResponse = await fetch(
    "http://127.0.0.1:8000/graphs/quantitative",
    {
      method: "POST",
      body: JSON.stringify({
        puuid:
          "jzdg2rwr6k16dsjfalqjeixnhaa_yyffhr0xdpwqbzqieai2rpb4npjpd2zw_iibav31xmrtrz4p6g",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const qualitativeData = await qualitativeResponse.json();
  const macrodata = await macroResponse.json();
  const quantitativeData = await quantitativeResponse.json()
  //<MacroScreen macrodata={macrodata} qualitativeData = {qualitativeData} quantitativeData = { quantitativeData}/>
  return (
    <>
      <PlaystyleScreen qualitativeData = {qualitativeData} quantitativeData = { quantitativeData}/>
    </>
  );
}
