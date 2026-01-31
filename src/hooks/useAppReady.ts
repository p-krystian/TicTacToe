import usePreference from '@/stores/preference/store';
import { useFonts } from 'expo-font';

function useAppReady() {
  const stateInitialized = usePreference(state => state._hasInitialized);

  const [fontsLoaded, fontError] = useFonts({
    'Tektur-Regular': require('@/assets/fonts/Tektur-Regular.ttf'),
    'ComicRelief-Bold': require('@/assets/fonts/ComicRelief-Bold.ttf')
  });

  return { isReady: (fontsLoaded || fontError) && stateInitialized, fontError };
}

export default useAppReady;
