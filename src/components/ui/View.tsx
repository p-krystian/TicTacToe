import { cn } from '@sglara/cn';
import { View, ViewProps } from 'react-native';

const StyledText = ({ className, ...props }: ViewProps) => (
  <View {...props} className={cn('bg-card', className)} />
);

export default StyledText;
