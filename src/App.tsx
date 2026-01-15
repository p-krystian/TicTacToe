import './global.css';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Desc from './components/Desc/Desc';
import Game from './components/Game/Game';

SplashScreen.preventAutoHideAsync();

function App() {
  const [loaded, error] = useFonts({
    'Tektur-Regular': require('./assets/fonts/Tektur-Regular.ttf'),
    'ComicRelief-Bold': require('./assets/fonts/ComicRelief-Bold.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />

      <SafeAreaView className="flex-1">
        <ScrollView className="h-full p-5" contentContainerClassName="items-center gap-4">
          <Desc />
          <Game />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
