import './global.css';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Desc from './components/Desc/Desc';
import Game from './components/Game/Game';
import { View } from './components/ui';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />

      <SafeAreaView className="flex-1">
        <View className="h-full gap-4 p-4">
          <Desc />
          <Game />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
