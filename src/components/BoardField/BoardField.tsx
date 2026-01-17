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
  const classNames = cn('web:text-content size-full rounded-sm', { 'bg-content': fill });

  return (
    <Pressable onPress={!symbol ? onChoose : null}>
      <View className="bg-card size-30 p-4">
        {symbol === 'x' ? (
          <SymbolX className={classNames} color={contentColor} />
        ) : symbol === 'o' ? (
          <SymbolO className={classNames} color={contentColor} />
        ) : null}
      </View>
    </Pressable>
  );
}

export default BoardField;
