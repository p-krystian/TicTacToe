import './global.css';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Game from './components/Game/Game';
import Desc from './components/Desc/Desc';

export default function App() {
  return (
    <View className="bg-card text-content flex-1">
      <StatusBar style="auto" />

      <View>
        <Desc />
        <Game />
      </View>
    </View>
  );
}
