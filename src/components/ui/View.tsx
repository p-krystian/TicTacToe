import { cn } from '@sglara/cn';
import { View, ViewProps } from 'react-native';

const StyledText = ({ className, ...props }: ViewProps) => (
  <View {...props} className={cn('', className)} />
);

export default StyledText;
