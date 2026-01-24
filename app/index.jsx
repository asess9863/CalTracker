import React from 'react';
import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link, router} from 'expo-router';

const Login = () => {

  // default username and passcode
  let username = 'Adam';
  let password = '1234';
  // usestate to check text in username and password fields
  const [Usertext, onChangeUserText] = React.useState('');
  const [Passtext, onChangePassText] = React.useState('');

  // on press function for logging in
  function LoginAttempt() {
    // if the username and password are valid push to home screen
    if (username === Usertext && password === Passtext) {
      console.log('Redirecting...');
      router.push('/Home');
    }
    // else reload
    else {
      router.push('/');
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          The Better Macro Tracker
        </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#ffffffff'}
          onChangeText={onChangeUserText}
          placeholder='Enter Username'
          value={Usertext}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={'#ffffffff'}
          onChangeText={onChangePassText}
          placeholder='Enter Password'
          value={Passtext}
        />
        <Button
          title='Log In'
          onPress={() => LoginAttempt()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#000000ff',
    flex: 1,
    padding: 24,
  },
  title: {
    color: '#ffffffff',
    textAlign: 'center',
    fontSize: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 4,
    borderColor: '#ffffffff',
    color: 'white',
    padding: 10,
  },
});


export default Login;