import '@/global.css';

import Desc from '@/components/Desc/Desc';
import GameBoard from '@/components/GameBoard/GameBoard';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';

SplashScreen.preventAutoHideAsync();

function App() {
  const currentTheme = Uniwind.currentTheme;
  const [loaded, error] = useFonts({
    'Tektur-Regular': require('@/assets/fonts/Tektur-Regular.ttf'),
    'ComicRelief-Bold': require('@/assets/fonts/ComicRelief-Bold.ttf')
  });

  const bgSource = useMemo(
    () =>
      currentTheme === 'dark'
        ? require('@/assets/images/dark.png')
        : require('@/assets/images/light.png'),
    [currentTheme]
  );

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <SafeAreaProvider className="max-w-full">
      <ImageBackground
        source={bgSource}
        className="web:h-full!"
        imageClassName="web:h-full! web:w-full! native:transform-scale-250"
        imageStyle={{ resizeMode: 'repeat' }}
      >
        <StatusBar style="auto" />

        <SafeAreaView className="flex-1">
          <ScrollView
            className="h-full"
            contentContainerClassName="flex-1 items-center gap-4 justify-evenly p-5"
          >
            <Desc />
            <GameBoard />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

export default App;
