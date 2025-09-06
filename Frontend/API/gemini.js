import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const JSON_SCHEMA = {
  type: "object",
  required: ["task","parameter","region","time","depth"],
  properties: {
    task: { type:"string", enum:["timeseries","depth_profile","map"] },
    parameter: { type:"string", enum:["TEMP","PSAL","DOXY"] },
    region: {
      type:"object",
      properties: {
        type:{ type:"string", enum:["bbox","named"] },
        value:{ type:"string" }
      }
    },
    time: {
      type:"object",
      properties:{ start:{type:"string"}, end:{type:"string"} }
    },
    depth: {
      type:"object",
      properties:{ min:{type:"number"}, max:{type:"number"} }
    }
  }
};

export async function makePlan(prompt) {
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: JSON_SCHEMA
    }
  });

  const system = "You convert natural-language ocean queries into JSON plan.";
  const res = await model.generateContent([
    { role:"user", parts:[system + "\nUser: " + prompt] }
  ]);

  const raw = res.response.text();
  return JSON.parse(raw);
}
