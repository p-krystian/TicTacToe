import { SymbolO, SymbolX } from '@/assets/images/svgs';
import { View } from '@/components/ui';
import useTransitionDuration from '@/hooks/useTransitionDuration';
import { cn } from '@sglara/cn';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useCSSVariable } from 'uniwind';

type BoardFieldProps = {
  symbol: 'x' | 'o' | null;
  fill?: boolean;
  onChoose?: (() => void) | null;
  position?: string;
};

function BoardField({ symbol, fill = false, onChoose, position }: BoardFieldProps) {
  const contentColor = useCSSVariable('--color-content')?.toString();
  const transitionDuration = useTransitionDuration();
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const content = useMemo(() => {
    const [InFade, OutFade] = [
      FadeIn.duration(transitionDuration),
      FadeOut.duration(transitionDuration)
    ];
    const SymbolComponent = symbol === 'x' ? SymbolX : symbol === 'o' ? SymbolO : null;
    const SymbolLabel = symbol === 'x' ? t('xSymbol') : t('oSymbol');

    return (
      <View className="relative isolate size-full overflow-hidden rounded-sm">
        {fill && (
          <Animated.View
            entering={InFade}
            exiting={OutFade}
            className="bg-content absolute inset-0 z-10 size-full"
          />
        )}

        {!fill && SymbolComponent && (
          <Animated.View entering={InFade} exiting={OutFade}>
            <SymbolComponent
              accessibilityLabel={SymbolLabel}
              className="web:text-content size-full"
              color={contentColor}
            />
          </Animated.View>
        )}
      </View>
    );
  }, [transitionDuration, symbol, fill, contentColor, t]);

  const accessibilityLabel = useMemo(() => {
    if (position) {
      const row = position[0];
      const col = parseInt(position[1]) + 1;
      const positionLabel = t('position', { row, col });

      if (symbol) {
        const symbolLabel = symbol === 'x' ? t('xSymbol') : t('oSymbol');
        return `${positionLabel}, ${symbolLabel}`;
      }
      return `${positionLabel}, ${t('empty')}`;
    }
    return symbol ? (symbol === 'x' ? t('xSymbol') : t('oSymbol')) : t('pressToChoose');
  }, [position, symbol, t]);

  return (
    <View className="bg-card size-30">
      <Pressable
        className={cn('size-full p-4 outline-none', { 'focus-bg': isFocused })}
        onPress={!symbol ? onChoose : null}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onHoverIn={() => setIsFocused(true)}
        onHoverOut={() => setIsFocused(false)}
      >
        {content}
      </Pressable>
    </View>
  );
}

export default memo(BoardField);
