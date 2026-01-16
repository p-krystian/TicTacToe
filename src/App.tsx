import './global.css';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import Desc from './components/Desc/Desc';
import Game from './components/Game/Game';
import GameBoard from './components/GameBoard/GameBoard';

SplashScreen.preventAutoHideAsync();

function App() {
  const [loaded, error] = useFonts({
    'Tektur-Regular': require('./assets/fonts/Tektur-Regular.ttf'),
    'ComicRelief-Bold': require('./assets/fonts/ComicRelief-Bold.ttf')
  });

  const bgSource = useMemo(
    () =>
      Uniwind.currentTheme === 'dark'
        ? require('./assets/images/dark.png')
        : require('./assets/images/light.png'),
    [Uniwind.currentTheme]
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
          <ScrollView className="h-full p-5" contentContainerClassName="items-center gap-4">
            <Desc />
            <GameBoard />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

export default App;
