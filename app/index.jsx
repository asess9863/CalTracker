import React from 'react';
import { Button, StyleSheet, Alert, TextInput, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link, router} from 'expo-router';

const Login = () => {

  let username = 'Asessions28';
  let password = 'P@$$w0rd';
  let auth = false;
  const [Usertext, onChangeUserText] = React.useState('');
  const [Passtext, onChangePassText] = React.useState('');

  function LoginAttempt() {
    if (username === Usertext && password === Passtext) {
      console.log('Redirecting...');
      router.push('/Home');
    }
    else {
      router.push('/');
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
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
          <Link href={"/CreateUser"} style={styles.link}>Register</Link>
        </View>
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
  link: {
    textAlign: 'center',
    marginTop: 12,
    color: 'white',
  },
});


export default Login;