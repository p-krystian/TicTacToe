import { SymbolO, SymbolX } from '@/assets/images/svgs';
import { View } from '@/components/ui';
import { cn } from '@sglara/cn';
import { Pressable } from 'react-native';
import { useCSSVariable } from 'uniwind';

type BoardFieldProps = {
  symbol: 'x' | 'o' | null;
  fill?: boolean;
  onChoose?: () => void;
};

function BoardField({ symbol, fill = false, onChoose }: BoardFieldProps) {
  const contentColor = useCSSVariable('--color-content')?.toString();

  const Content = (
    <View className={cn('size-full rounded-sm', { 'bg-content': fill })}>
      {symbol === 'x' ? (
        <SymbolX className="web:text-content size-full" color={contentColor} />
      ) : symbol === 'o' ? (
        <SymbolO className="web:text-content size-full" color={contentColor} />
      ) : null}
    </View>
  );

  return (
    <View className="bg-card size-30">
      {!symbol ? (
        <Pressable className="size-full p-4" onPress={onChoose}>
          {Content}
        </Pressable>
      ) : (
        <View className="size-full p-4">{Content}</View>
      )}
    </View>
  );
}

export default BoardField;
