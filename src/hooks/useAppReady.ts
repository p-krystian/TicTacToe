import usePreference from '@/stores/preference/store';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

function useAppReady() {
  const stateInitialized = usePreference(state => state._hasInitialized);

  const [fontsLoaded, fontError] = useFonts({
    'Tektur-Regular': require('@/assets/fonts/Tektur-Regular.ttf'),
    'ComicRelief-Bold': require('@/assets/fonts/ComicRelief-Bold.ttf')
  });

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

  return { isReady };
}

export default useAppReady;
