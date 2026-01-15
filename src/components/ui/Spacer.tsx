import { View } from 'react-native';

type SpacerProps = {
  size?: number;
};

const Spacer = ({ size = 0 }: SpacerProps) => (
  <View style={{ height: size, width: '100%' }} />
);

export default Spacer;
