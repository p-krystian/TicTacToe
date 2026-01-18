import { cn } from '@sglara/cn';
import { Pressable, PressableProps, Text } from 'react-native';

type StyledButtonProps = PressableProps & {
  title: string;
  textClassName?: string;
  children?: never;
};

const StyledButton = ({ title, className, textClassName, ...props }: StyledButtonProps) => (
  <Pressable {...props} className={cn('w-fit', className)}>
    <Text
      className={cn(
        'text-content font-comicRelif w-full text-center text-lg uppercase select-none',
        textClassName
      )}
    >
      {title}
    </Text>
  </Pressable>
);

export default StyledButton;
