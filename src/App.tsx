import '@/global.css';

import { dark, light } from '@/assets/images/bgs';
import Desc from '@/components/Desc/Desc';
import GameBoard from '@/components/GameBoard/GameBoard';
import { Button, View } from '@/components/ui';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind, useUniwind } from 'uniwind';

SplashScreen.preventAutoHideAsync();

function App() {
  const { theme } = useUniwind();
  const { width, height } = useWindowDimensions();
  const [loaded, error] = useFonts({
    'Tektur-Regular': require('@/assets/fonts/Tektur-Regular.ttf'),
    'ComicRelief-Bold': require('@/assets/fonts/ComicRelief-Bold.ttf')
  });

  const bgSource = useMemo(() => (theme === 'dark' ? dark : light), [theme]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    if (error) {
      console.error(error);
    }
  }, [loaded, error]);

  return !loaded && !error ? null : (
    <SafeAreaListener onChange={({ insets }) => Uniwind.updateInsets(insets)}>
      <ImageBackground
        source={bgSource}
        className="flex-1"
        imageClassName="web:h-full! w-full! native:scale-200"
        resizeMode="repeat"
      >
        <StatusBar style="auto" hidden={width >= height} />

        <ScrollView contentContainerClassName="main-container">
          <View className="gap-4 landscape:max-w-md">
            <Desc />
            <View className="flex-row items-center justify-evenly gap-4 py-1">
              <Button title="Polski" />
              <Button
                title="Change theme"
                onPress={() => Uniwind.setTheme(theme === 'dark' ? 'light' : 'dark')}
              />
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
