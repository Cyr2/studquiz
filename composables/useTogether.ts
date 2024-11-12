import Together from 'together-ai';

export function useTogether() {
  const config = useRuntimeConfig();
  const apiKey = config.public.togetherApi;

  if (!apiKey) {
    console.error('Error: TOGETHER_API_KEY is missing. Please check your environment variables.');
  }

  const together = new Together({
    apiKey: apiKey,
    baseURL: 'https://api.together.xyz/v1'
  });

  return {
    together,
  };
}
