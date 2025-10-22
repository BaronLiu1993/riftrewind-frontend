import PlaystyleScreen from "../components/playstyle";
import MacroScreen from "../components/macroplay";
import CamcorderOverlay from "../components/camcorder";

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

  /*
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
  */
  const scatterResponse = await fetch("http://127.0.0.1:8000/graphs/scatter", {
    method: "POST",
    body: JSON.stringify({
      puuid:
        "jzdg2rwr6k16dsjfalqjeixnhaa_yyffhr0xdpwqbzqieai2rpb4npjpd2zw_iibav31xmrtrz4p6g",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const macrodata = await macroResponse.json();
  const scatterData = await scatterResponse.json();
  //      <PlaystyleScreen scatterData={scatterData}s/>

  //<MacroScreen macrodata={macrodata} qualitativeData = {qualitativeData} quantitativeData = { quantitativeData}/>
  return (
    <>
      <CamcorderOverlay />
    </>
  );
}
