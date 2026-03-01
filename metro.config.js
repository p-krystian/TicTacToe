const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');
const fs = require('fs');
const path = require('path');

const rnwPath = fs.realpathSync(
  path.resolve(require.resolve('react-native-windows/package.json'), '..')
);

const config = getDefaultConfig(__dirname);

// 1. CRITICAL FIX: Inform Metro about Windows platform support
// This ensures correct prioritization of .windows.js files natively
if (!config.resolver.platforms.includes('windows')) {
  config.resolver.platforms.push('windows');
}

// 2. Alias configuration
config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname, 'src')
};

// 3. Transformer configuration
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

const defaultBlockList = Array.isArray(config.resolver.blockList) 
  ? config.resolver.blockList 
  : (config.resolver.blockList ? [config.resolver.blockList] : []);

// 4. Resolver configuration
config.resolver = {
  ...config.resolver,
  blockList: [
    ...defaultBlockList,
    new RegExp(`${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`),
    new RegExp(`${rnwPath}/build/.*`),
    new RegExp(`${rnwPath}/target/.*`),
    /.*\.ProjectImports\.zip/,
  ],
  assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
  // Let Metro handle Windows extensions natively, just add 'svg' and 'css'
  sourceExts: [...config.resolver.sourceExts, 'svg', 'css'], 
  
  resolveRequest: (context, moduleName, platform) => {
    if (platform === 'web' && moduleName.startsWith('zustand')) {
      const projectRoot = context.projectRoot || __dirname;
      if (moduleName === 'zustand') {
        return { filePath: path.join(projectRoot, 'node_modules/zustand/index.js'), type: 'sourceFile' };
      }
      if (moduleName === 'zustand/middleware') {
        return { filePath: path.join(projectRoot, 'node_modules/zustand/middleware.js'), type: 'sourceFile' };
      }
    }
    return context.resolveRequest(context, moduleName, platform);
  }
};

module.exports = withUniwindConfig(config, {
  cssEntryFile: './src/global.css',
  dtsFile: './src/@types/uniwind.d.ts',
  polyfills: { rem: 14 },
  debug: true
});
