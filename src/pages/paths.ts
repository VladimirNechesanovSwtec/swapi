const paths = {
  index: '/',
  characters: '/people',
  character: (characterId: string = ':characterId') => `/people/${characterId}`,
};

export default paths;
