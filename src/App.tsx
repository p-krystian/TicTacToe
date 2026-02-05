import '@/global.css';
import '@/utils/i18n';

import { dark, light } from '@/assets/images/bgs';
import Desc from '@/components/Desc/Desc';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import GameBoard from '@/components/GameBoard/GameBoard';
import LangSwitcher from '@/components/LangSwitcher/LangSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { View } from '@/components/ui';
import useInsetsUpdate from '@/hooks/useInsetsUpdate';
import usePreference from '@/stores/preference/store';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { StrictMode, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const theme = usePreference(state => state.theme);
  const stateInitialized = usePreference(state => state._hasInitialized);
  const { width, height } = useWindowDimensions();
  const [fontsLoaded, fontError] = useFonts({
    'Tektur-Regular': require('@/assets/fonts/Tektur-Regular.ttf'),
    'ComicRelief-Bold': require('@/assets/fonts/ComicRelief-Bold.ttf')
  });
  useInsetsUpdate();
  const isReady = (fontsLoaded || fontError) && stateInitialized;

  useEffect(() => {
    if (fontError) {
      console.error('[Font Loading Error]', fontError);
    }
  }, [fontError]);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return !isReady ? null : (
    <ImageBackground
      source={theme === 'dark' ? dark : light}
      className="flex-1"
      imageClassName="web:h-full! w-full! native:scale-200"
      resizeMode="repeat"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
    >
      <StatusBar style="auto" hidden={width >= height} />

      <ScrollView contentContainerClassName="main-container">
        <View className="gap-4 landscape:max-w-md">
          <Desc />
          <View className="flex-row items-center justify-evenly gap-4 py-1">
            <LangSwitcher />
            <ThemeSwitcher />
          </View>
        </View>
        <View className="grow items-center justify-center landscape:grow-0">
          <GameBoard />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function App() {
  return (
    <StrictMode>
      <SafeAreaProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppContent />
        </ErrorBoundary>
      </SafeAreaProvider>
    </StrictMode>
  );
}

export default App;
