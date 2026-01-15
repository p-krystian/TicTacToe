import { cn } from '@sglara/cn';
import { Text, TextProps } from 'react-native';

const StyledText = ({ className, ...props }: TextProps) => (
  <Text {...props} className={cn('text-base, text-content', className)} />
);

export default StyledText;
