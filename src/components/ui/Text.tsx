import { cn } from '@sglara/cn';
import { Text, TextProps } from 'react-native';

const StyledText = ({ className, ...props }: TextProps) => (
  <Text
    {...props}
    className={cn('text-content prominent-text font-tektur text-base/5.5', className)}
  />
);

export default StyledText;
