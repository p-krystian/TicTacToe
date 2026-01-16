import { Text, View } from '@/components/ui';
import { Pressable } from 'react-native';

type BoardFieldProps = {
  symbol: 'x' | 'o' | null;
  fill?: boolean;
  onChoose?: () => void;
};

function BoardField({ symbol, fill = false, onChoose }: BoardFieldProps) {
  return (
    <Pressable onPress={onChoose}>
      <View className="bg-card size-30">
        <Text>{symbol}</Text>
      </View>
    </Pressable>
  );
}

export default BoardField;
