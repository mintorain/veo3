
import { GoogleGenAI } from "@google/genai";
import type { PromptData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const createPromptForGemini = (data: PromptData): string => {
  const {
    characters,
    actions,
    scene,
    dialogue,
    language,
    soundDesign,
    angles,
    movements,
  } = data;

  let prompt = `
You are an expert prompt writer for VEO, a generative text-to-video AI model. Your task is to synthesize the following user-provided elements into a single, cohesive, and highly detailed video prompt. The final prompt should be a vivid description of a scene, ready for the VEO model to generate a video.

**Core Elements to Include:**

1.  **Characters:** ${characters || 'Not specified.'}
2.  **Actions:** ${actions || 'Not specified.'}
3.  **Scene & Background:** ${scene || 'Not specified.'}
4.  **Dialogue (Language: ${language}):** ${dialogue || 'No dialogue.'}
5.  **Sound Design:** ${soundDesign || 'Not specified.'}
6.  **Camera Angles:** ${angles.length > 0 ? angles.join(', ') : 'Not specified.'}
7.  **Camera Movements:** ${movements.length > 0 ? movements.join(', ') : 'Not specified.'}

**Instructions for Prompt Generation:**

*   **Combine and Elaborate:** Do not just list the elements. Weave them into a narrative description of a single, continuous shot or scene. Describe the atmosphere, mood, and visual style.
*   **Visual Style Keywords:** Add powerful keywords like "4K, hyper-realistic, cinematic lighting, vivid colors, depth of field, detailed textures" to enhance the visual quality.
*   **Negative Prompts:** Conclude the prompt with essential negative instructions: "Do not include any text overlays, subtitles, or watermarks."
*   **Output Format:** Provide only the final, complete prompt as a single block of text. Do not add any extra explanations, introductions, or markdown formatting.

Generate the prompt based on the user's input.
  `;
  return prompt.trim();
};

export const generateVideoPrompt = async (promptData: PromptData): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = createPromptForGemini(promptData);

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating prompt with Gemini:", error);
    throw new Error("Failed to generate prompt. Please check your API key and try again.");
  }
};
