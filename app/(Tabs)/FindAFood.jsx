import  React  from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router'
import AppButton from '../AppButton';

export default function FindAFood(){
    
    const [Foodtext, onChangeFoodText] = React.useState('')

      function SearchAttempt() {
        console.log('Searching...');
      }

      function BarCodeRedirect() {
        router.push('/BarcodeScan');
      }
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    Search for a Food
                </Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={'#ffffffff'}
                  onChangeText={onChangeFoodText}
                  placeholder='Enter A Food'
                  value={Foodtext}
                />
                <AppButton 
                    title='Search'
                    onPress={() => SearchAttempt()}
                />
                <View style={{padding: 24}}>
                    <AppButton
                        title='Use Barcode Scanner'
                        onPress={() => BarCodeRedirect()}
                    />
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#000000ff',
    flex: 1,
    padding: 24,
  },
  title: {
    color: '#ffffffff',
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
  },
  input: {
    width: 355,
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
  Dropdown: {
    color: 'white'
  },
});