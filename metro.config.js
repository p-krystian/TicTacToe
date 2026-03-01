const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');
const fs = require('fs');
const path = require('path');

// Path to react-native-windows needed for blockList
const rnwPath = fs.realpathSync(
  path.resolve(require.resolve('react-native-windows/package.json'), '..')
);

// 1. Get the base EXPO configuration
const config = getDefaultConfig(__dirname);

// 2. Configure @ alias
config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname, 'src')
};

// 3. Transformer configuration (merging Expo SVG and Windows options)
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

// Fallback in case Expo's blockList is not an array
const defaultBlockList = Array.isArray(config.resolver.blockList) 
  ? config.resolver.blockList 
  : (config.resolver.blockList ? [config.resolver.blockList] : []);

// 4. Resolver configuration (merging Windows blockList, SVG, sourceExts, and Zustand)
config.resolver = {
  ...config.resolver,
  blockList: [
    ...defaultBlockList,
    // Windows rules preventing Metro crashes when Visual Studio / MSBuild is running
    new RegExp(`${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`),
    new RegExp(`${rnwPath}/build/.*`),
    new RegExp(`${rnwPath}/target/.*`),
    /.*\.ProjectImports\.zip/,
  ],
  assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
  // Add Windows extensions so Expo Metro recognizes them
  sourceExts: [...config.resolver.sourceExts, 'svg', 'windows.js', 'windows.tsx', 'windows.ts'],
  
  // Workaround for Zustand on web
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

// 5. Return the config wrapped in Uniwind
module.exports = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './src/@types/uniwind.d.ts',
  polyfills: {
    rem: 14
  },
  debug: true
});
