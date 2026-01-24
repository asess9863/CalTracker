import { useState } from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import AppButton from './AppButton';

const logFood = () => {

	// create router object for redirect
	const router = useRouter();
	// get Food name from dynamic file name
	const { Food } = useLocalSearchParams();
    const [ServingsText, SetServingsText] = useState('')

	async function CallFoodLog(){
		try {
			// send a request to the server to log a food with a specific name and serving number
			const response = await fetch("http://10.0.0.157:5000/logFood",
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
				{/* onPress function uses router.push to redirect to the find a food page when back button is pressed */}
				<TouchableOpacity style={styles.imageButton} onPress={() => router.push('/FindAFood')}>
					<AntDesign name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
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
	imageButton: {
        position: 'absolute',
        top: 15,
        left: 10,
        zIndex: 20,
    },
})

export default logFood;