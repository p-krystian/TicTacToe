import '@/global.css';

import { dark, light } from '@/assets/images/bgs';
import Desc from '@/components/Desc/Desc';
import GameBoard from '@/components/GameBoard/GameBoard';
import { Button, View } from '@/components/ui';
import usePreferences from '@/stores/preference/store';
import '@/utils/i18n';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import { translations } from './assets/langs';
import { setLanguage, toggleTheme } from './stores/preference/setters';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const stateInitialized = usePreferences(state => state._hasInitialized);
  const theme = usePreferences(state => state.theme);
  const language = usePreferences(state => state.language);

  const { width, height } = useWindowDimensions();
  const [loaded, error] = useFonts({
    'Tektur-Regular': require('@/assets/fonts/Tektur-Regular.ttf'),
    'ComicRelief-Bold': require('@/assets/fonts/ComicRelief-Bold.ttf')
  });

  useEffect(() => {
    Uniwind.updateInsets(insets);
  }, [insets]);

  useEffect(() => {
    if ((loaded || error) && stateInitialized) {
      SplashScreen.hideAsync();
    }
    if (error) {
      console.error(error);
    }
  }, [loaded, error, stateInitialized]);

  const [nextLangCode, nextLangName] = useMemo(() => {
    const keys = Object.keys(translations) as (keyof typeof translations)[];
    const nextIndex = (keys.indexOf(language) + 1) % keys.length;
    const nextCode = keys[nextIndex];

    return [nextCode, translations[nextCode].name] as const;
  }, [language]);

  return (!loaded && !error) || !stateInitialized ? null : (
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
              <Button title={nextLangName} onPress={() => setLanguage(nextLangCode)} />
              <Button title={t('changeTheme')} onPress={toggleTheme} />
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
