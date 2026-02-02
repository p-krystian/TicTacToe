import { getErrorMessage, type FallbackProps } from 'react-error-boundary';
import { Button, Text, View } from 'react-native';

function ErrorFallback(props: FallbackProps) {
  return (
    <View
      style={{
        flex: 1,
        gap: 24,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#131313'
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#dadada' }}>
        {'Something went wrong'}
      </Text>

      <Text style={{ fontSize: 16, color: '#da1313' }}>{getErrorMessage(props.error)}</Text>

      <Button title="Retry" onPress={props.resetErrorBoundary} />
    </View>
  );
}

export default ErrorFallback;
