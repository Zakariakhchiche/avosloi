import { Configuration, OpenAIApi } from 'openai';

export const dalle = async (prompt) => {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: '512x512',
  });

  return response.data.data[0].url;
};
