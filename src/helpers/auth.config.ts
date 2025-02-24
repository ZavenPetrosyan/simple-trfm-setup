export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  bunnyApiKey: process.env.BUNNY_API_KEY,
  bunnyLibraryId: process.env.BUNNY_LIBRARY_ID,
  riot: {
    clientId: process.env.RIOT_CLIENT_ID,
    clientSecret: process.env.RIOT_CLIENT_SECRET,
    redirectUri: process.env.RIOT_REDIRECT_URL,
    providerUrl: process.env.RIOT_PROVIDER_URL || 'https://auth.riotgames.com',
    api_key: process.env.RIOT_API_KEY,
  },
});
