module.exports = function (api) {
  // Log to ensure the custom config is being loaded by Metro
  console.log('\n\n🛠️ 🛠️ 🛠️ LOADING ROBUST REGEX BABEL CONFIG 🛠️ 🛠️ 🛠️\n\n');
  
  // Temporarily disable cache for testing purposes
  api.cache(false); 

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          // Added .css so Babel doesn't skip your global.css file
          extensions: [
            '.windows.tsx', '.windows.ts', '.windows.js', 
            '.tsx', '.ts', '.jsx', '.js', '.json', '.css'
          ],
          alias: {
            // Using a regular expression to map anything after @/ to ./src/
            '^@/(.+)': './src/\\1',
          },
        },
      ],
    ],
  };
};
