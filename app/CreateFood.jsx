import React from 'react';
import { Button, StyleSheet, TextInput, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link, router} from 'expo-router';
import CustomFoods from './CustomFoods.jsx'
import { Dropdown } from 'react-native-element-dropdown'

const CreateFood = () => { 
    let FoodList = [];
    const [ProteinText, onChangeProteinText] = React.useState('');
    const [CarbText, onChangeCarbText] = React.useState('');
    const [FatText, onChangeFatText] = React.useState('');
    const [FoodNameText, onChangeFoodNameText] = React.useState('');

    function FoodCreate(){
        const CustomFood = new CustomFoods(Number(ProteinText), Number(CarbText), Number(FatText), FoodNameText)
        FoodList.push(CustomFood);
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
                    <Button
                      title='Create Food'
                      onPress={() => FoodCreate()}
                    />
                    <Link style={styles.link} href={'/Home'}> Go home </Link>

                    <Dropdown
                        style={styles.Dropdown}
                        placeholder='Please choose from a food'
                        placeholderTextColor={'white'}
                        data={FoodList}
                        maxHeight={300}
                    />
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
  link: {
    textAlign: 'center',
    marginTop: 12,
    color: 'white',
  },
  Dropdown: {
    color: 'white'
  }
});

export default CreateFood;