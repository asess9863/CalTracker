import { useEffect, useState } from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import AppButton from './AppButton';

const logFood = () => {

	const { Food } = useLocalSearchParams();
    const [ServingsText, SetServingsText] = useState('')
	const [FoodData, SetFoodData] = useState(null)
	const [Success, setSuccess] = useState(false)

	async function CallFoodLog(){
		try {
			console.log(Food)
			const response = await fetch("http://10.7.41.135:5000/logFood",
				{ 
					method: "POST", 
					headers: {
						'Content-type': 'application/json',
						"Accept": "application/json"
					},
					body: JSON.stringify({ Name: Food, Servings: ServingsText })
				}
			)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			else
			{
				const result = await response.json();
				Alert.alert('Success', 'Data sent and response received!')
				SetFoodData(result.food);
				setSuccess(true);
			}
		}
		catch (error) {
			console.error('Error sending data to Flask: ', error);
			Alert.alert("Error", "Failed to connect to server");
		}
	}
    return(
        <SafeAreaProvider>
            <View style={styles.container}>
                <AntDesign name="arrow-left" size={24} color="white" />
                <Text style={styles.title}> Logging { Food } </Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#ffffffff'}
                    onChangeText={SetServingsText}
                    placeholder='Enter Servings Eaten'
                    value={ServingsText}
                />
				<AppButton title='Log Food'onPress={() => CallFoodLog()}/>
            </View>
        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
	Topcontainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'top',
		backgroundColor: 'black',
		padding: 12,
	},
	Centercontainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'top',
		backgroundColor: 'black',
		padding: 80,
	},
	title: {
		color: 'white',
		textAlign: 'center',
		fontSize: 40,
	},
    input: {
		height: 40,
		width: 350,
		margin: 12,
		borderWidth: 4,
		borderColor: '#ffffffff',
		color: 'white',
		padding: 10,
	},
})

export default logFood;