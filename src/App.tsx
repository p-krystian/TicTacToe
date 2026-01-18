import '@/global.css';

import Desc from '@/components/Desc/Desc';
import GameBoard from '@/components/GameBoard/GameBoard';
import { Button, View } from '@/components/ui';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind, useUniwind } from 'uniwind';

SplashScreen.preventAutoHideAsync();

function App() {
  const { theme } = useUniwind();
  const [loaded, error] = useFonts({
    'Tektur-Regular': require('@/assets/fonts/Tektur-Regular.ttf'),
    'ComicRelief-Bold': require('@/assets/fonts/ComicRelief-Bold.ttf')
  });

  const bgSource = useMemo(
    () =>
      theme === 'dark' ? require('@/assets/images/dark.png') : require('@/assets/images/light.png'),
    [theme]
  );

  useEffect(() => {
    if (loaded || error) {
      Uniwind.setTheme(Uniwind.currentTheme);
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <SafeAreaListener onChange={({ insets }) => Uniwind.updateInsets(insets)}>
      <ImageBackground
        source={bgSource}
        className="web:h-full!"
        imageClassName="web:h-full! web:w-full! native:transform-scale-250"
        imageStyle={{ resizeMode: 'repeat' }}
      >
        <StatusBar style="auto" />

        <ScrollView
          className="h-full p-safe"
          contentContainerClassName="flex-1 justify-evenly min-h-full items-center gap-4 p-4"
        >
          <View className="gap-4">
            <Desc />
            <View className="flex-row items-center justify-evenly gap-4 py-2">
              <Button title="Polski" />
              <Button
                title="Change theme"
                onPress={() => Uniwind.setTheme(theme === 'dark' ? 'light' : 'dark')}
              />
            </View>
          </View>

          <GameBoard />
        </ScrollView>
      </ImageBackground>
    </SafeAreaListener>
  );
}

export default App;
