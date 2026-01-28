const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Configure @ alias
config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname, 'src')
};

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo')
};
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
  // Force CommonJS resolution for zustand to avoid import.meta issues on web
  resolveRequest: (context, moduleName, platform) => {
    if (platform === 'web' && moduleName.startsWith('zustand')) {
      const projectRoot = context.projectRoot || __dirname;
      
      if (moduleName === 'zustand') {
        return {
          filePath: path.join(projectRoot, 'node_modules/zustand/index.js'),
          type: 'sourceFile',
        };
      }
      if (moduleName === 'zustand/middleware') {
        return {
          filePath: path.join(projectRoot, 'node_modules/zustand/middleware.js'),
          type: 'sourceFile',
        };
      }
    }
    return context.resolveRequest(context, moduleName, platform);
  }
};

module.exports = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './src/@types/uniwind.d.ts',
  polyfills: {
    rem: 14
  },
  debug: true
});
