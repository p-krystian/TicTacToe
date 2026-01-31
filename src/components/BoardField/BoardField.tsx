import { SymbolO, SymbolX } from '@/assets/images/svgs';
import { View } from '@/components/ui';
import useTransitionDuration from '@/hooks/useTransitionDuration';
import { memo, useMemo } from 'react';
import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useCSSVariable } from 'uniwind';

type BoardFieldProps = {
  symbol: 'x' | 'o' | null;
  fill?: boolean;
  onChoose?: (() => void) | null;
};

function BoardField({ symbol, fill = false, onChoose }: BoardFieldProps) {
  const contentColor = useCSSVariable('--color-content')?.toString();
  const transitionDuration = useTransitionDuration();

  const [InFade, OutFade] = useMemo(
    () => [FadeIn.duration(transitionDuration), FadeOut.duration(transitionDuration)],
    [transitionDuration]
  );

  const content = useMemo(
    () => (
      <View className="relative isolate size-full overflow-hidden rounded-sm">
        {fill && (
          <Animated.View
            entering={InFade}
            exiting={OutFade}
            className="bg-content absolute inset-0 z-10 size-full"
          />
        )}

        {!fill && symbol === 'x' ? (
          <Animated.View entering={InFade} exiting={OutFade}>
            <SymbolX className="web:text-content size-full" color={contentColor} />
          </Animated.View>
        ) : !fill && symbol === 'o' ? (
          <Animated.View entering={InFade} exiting={OutFade}>
            <SymbolO className="web:text-content size-full" color={contentColor} />
          </Animated.View>
        ) : null}
      </View>
    ),
    [symbol, fill, contentColor, InFade, OutFade]
  );

  return (
    <View className="bg-card size-30">
      {!symbol && !!onChoose ? (
        <Pressable className="size-full p-4" onPress={onChoose}>
          {content}
        </Pressable>
      ) : (
        <View className="size-full p-4">{content}</View>
      )}
    </View>
  );
}

export default memo(BoardField);
