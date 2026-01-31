import { cn } from '@sglara/cn';
import { View, ViewProps } from 'react-native';

const StyledView = ({ className, ...props }: ViewProps) => (
  <View {...props} className={cn('', className)} />
);

export default StyledView;
