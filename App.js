import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';

const App = () => {
  const handlePress = () => {
    Alert.alert('Button Pressed');
  };

  return (
    <View style={styles.container}>
      <Text>Press to Log in</Text>
      <StatusBar style="auto" />
      <Button
        title="Log In"
        onPress={handlePress}
        color={'#000000ff'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;