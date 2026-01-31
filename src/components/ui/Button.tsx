import { cn } from '@sglara/cn';
import { Pressable, PressableProps, Text } from 'react-native';

type StyledButtonProps = PressableProps & {
  title: string;
  textClassName?: string;
  children?: never;
};

const StyledButton = ({ title, className, textClassName, ...props }: StyledButtonProps) => (
  <Pressable accessibilityRole="button" {...props} className={cn('px-2 py-2', className)}>
    <Text
      className={cn(
        'text-content font-comicRelif prominent-text px-2 text-center text-lg uppercase select-none',
        textClassName
      )}
    >
      {title}
    </Text>
  </Pressable>
);

export default StyledButton;
