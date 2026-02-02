import '@/global.css';
import '@/utils/i18n';

import { dark, light } from '@/assets/images/bgs';
import Desc from '@/components/Desc/Desc';
import GameBoard from '@/components/GameBoard/GameBoard';
import LangSwitcher from '@/components/LangSwitcher/LangSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { View } from '@/components/ui';
import useAppReady from '@/hooks/useAppReady';
import useInsetsUpdate from '@/hooks/useInsetsUpdate';
import usePreferences from '@/stores/preference/store';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const theme = usePreferences(state => state.theme);
  const { width, height } = useWindowDimensions();
  const { isReady } = useAppReady();
  useInsetsUpdate();

  return !isReady ? null : (
    <ImageBackground
      source={theme === 'dark' ? dark : light}
      className="flex-1"
      imageClassName="web:h-full! w-full! native:scale-200"
      resizeMode="repeat"
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
        <View className="grow items-center justify-center">
          <GameBoard />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

export default App;
