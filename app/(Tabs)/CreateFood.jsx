import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../AppButton';


const CreateFood = () => {
    const [ProteinText, onChangeProteinText] = useState('');
    const [CarbText, onChangeCarbText] = useState('');
    const [FatText, onChangeFatText] = useState('');
    const [FoodNameText, onChangeFoodNameText] = React.useState('');

    async function FoodCreate(){
        try {
              // fetch info from create food route
              const response = await fetch("http://10.0.0.157:5000/CreateFood",
                { 
                  method: "POST", 
                  headers: {
                    'Content-type': 'application/json',
                    "Accept": "application/json"
                  },
                  // pass the info held inside the input boxes into their respective fields
                  body: JSON.stringify({ "Name" : FoodNameText,
                                         "Calories" : Number(ProteinText)*4 + Number(CarbText)*4 + Number(FatText)*9,
                                         "Protein" : Number(ProteinText),
                                         "Carbs" : Number(CarbText),
                                         "Fats" : Number(FatText)
                  })
                }
              )
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              else
              {
                const result = await response.json();
              }
            }
            catch (error) {
              console.error('Error sending data to Flask: ', error);
              Alert.alert("Error", "Failed to connect to server");
            }
    }
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                        Enter Your macros and name your meal
                </Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'#ffffffff'}
                        onChangeText={onChangeFoodNameText}
                        placeholder='Enter Name of food'
                        value={FoodNameText}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'#ffffffff'}
                        onChangeText={onChangeCarbText}
                        placeholder='Enter Carbs in g'
                        value={CarbText}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'#ffffffff'}
                        onChangeText={onChangeFatText}
                        placeholder='Enter Fats in g'
                        value={FatText}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'#ffffffff'}
                        onChangeText={onChangeProteinText}
                        placeholder='Enter Protein in g'
                        value={ProteinText}
                    />
                    <AppButton title='Create Food' onPress={() => FoodCreate()}/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
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
});

export default CreateFood;