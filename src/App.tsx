import '@/global.css';

import { dark, light } from '@/assets/images/bgs';
import Desc from '@/components/Desc/Desc';
import GameBoard from '@/components/GameBoard/GameBoard';
import { Button, View } from '@/components/ui';
import usePreferences from '@/stores/preferences';
import '@/utils/i18n';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
SplashScreen.preventAutoHideAsync();

function App() {
  const { t, i18n } = useTranslation();
  const theme = usePreferences(state => state.theme);
  const { toggleTheme } = usePreferences(state => state.actions);

  const { width, height } = useWindowDimensions();
  const [loaded, error] = useFonts({
    'Tektur-Regular': require('@/assets/fonts/Tektur-Regular.ttf'),
    'ComicRelief-Bold': require('@/assets/fonts/ComicRelief-Bold.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    if (error) {
      console.error(error);
    }
  }, [loaded, error]);

  useEffect(() => {
    Uniwind.setTheme(theme);
  }, [theme]);

  return !loaded && !error ? null : (
    <SafeAreaListener onChange={({ insets }) => Uniwind.updateInsets(insets)}>
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
              <Button title="Polski" onPress={() => i18n.changeLanguage('pl')} />
              <Button title={t('changeTheme')} onPress={toggleTheme} />
            </View>
          </View>
          <View className="grow items-center justify-center">
            <GameBoard />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaListener>
  );
}

export default App;
