import Together from 'together-ai';

export function useTogether() {
  const config = useRuntimeConfig();
  const apiKey = config.public.togetherApi;

  if (!apiKey) {
    console.error('Error: TOGETHER_API_KEY is missing. Please check your environment variables.');
  }

  const together = new Together({
    apiKey: '086481921d384e56cc715916fcf073f7c98099379d65c0a59110d27afbe3925a',
    baseURL: 'https://api.together.xyz/v1'
  });

  return {
    together,
  };
}
