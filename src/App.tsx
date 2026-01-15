import './global.css';

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="bg-contrast light:bg-primary flex-1 items-center justify-center">
      <Text className="text-primary light:bg-contrast">TicTacToe</Text>
      <StatusBar style="auto" />
    </View>
  );
}
