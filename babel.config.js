module.exports = function (api) {
  console.log('\n\n🛠️ 🛠️ 🛠️ LOADING ROBUST REGEX BABEL CONFIG 🛠️ 🛠️ 🛠️\n\n');
  api.cache(false); 

  return {
    presets: [
      ['babel-preset-expo', { unstable_transformImportMeta: true }]
    ],
    plugins: [
      [
        'module-resolver',
        {
          // Usunęliśmy root: ['./'], aby uniknąć konfliktów z plikami wewnętrznymi RN!
          extensions: [
            '.windows.tsx', '.windows.ts', '.windows.js', 
            '.tsx', '.ts', '.jsx', '.js', '.json', '.css'
          ],
          alias: {
            '^@/(.+)': './src/\\1',
          },
        },
      ],
    ],
  };
};
