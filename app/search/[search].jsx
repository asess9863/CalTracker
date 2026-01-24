// For Auto call on render and state management
import { useEffect, useState } from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// Used to pass the food searched
import { useLocalSearchParams, useRouter } from 'expo-router';
// buttons
import AntDesign from '@expo/vector-icons/AntDesign';
import AppButton from '../AppButton';

const FoodTest = () => {
	// getting the name of the file and setting it to a variable
    const { search } = useLocalSearchParams();
	const [foodData, setFoodData] = useState(null);
	const [Success, setSuccess] = useState(false)
	const router = useRouter();

	// onPress function that redirects if a food doest exist
	function CreateRedirect(){
		router.push('/CreateFood')
	}

	// takes you to the [food].jsx file for further logging
	function LogRedirect(){
		router.push(`/${search}`)
	}

	async function Attempt() {
		try {
			// fetch the food info
			const response = await fetch("http://10.0.0.157:5000/search",
				{ 
					method: "POST", 
					headers: {
						'Content-type': 'application/json',
						"Accept": "application/json"
					},
					// pass the food name in the search variable
					body: JSON.stringify({ Name: search })
				}
			)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			else
			{
				// get response back from server
				const result = await response.json();
				// alert user that their query was successful
				Alert.alert('Success', 'Data sent and response received!')
				setFoodData(result.food);
				setSuccess(true);
			}
		}
		catch (error) {
			console.error('Error sending data to Flask: ', error);
			Alert.alert("Error", "Failed to connect to server");
		}
	}

	// auto call function on render, pass in search as a parameter
	useEffect(() => {Attempt()}, [search]);

	return (
		<SafeAreaProvider>
			<View style={styles.Centercontainer}>
				<TouchableOpacity style={styles.imageButton} onPress={() => router.push('/FindAFood')}>
					<AntDesign name="arrow-left" size={24} color="white" />
				</TouchableOpacity>
				<Text style={styles.title}>Searching for: {search}</Text>
			
				{!! Success && foodData && <Text style={styles.FoodPrint}> Name: {foodData.name} </Text>}
				{!! Success && foodData && <Text style={styles.FoodPrint}> Calories: {foodData.calories} </Text>}
				{!! Success && foodData && <Text style={styles.FoodPrint}> Protein: {foodData.protein} </Text>}
				{!! Success && foodData && <Text style={styles.FoodPrint}> Carbs: {foodData.carbs} </Text>}
				{!! Success && foodData && <Text style={styles.FoodPrint}> Fats: {foodData.fats} </Text>}
				{!! Success && foodData && <AppButton title='Log This Food'onPress={() => LogRedirect()}/>}
				{!! !Success && <AppButton title='Create Food'onPress={() => CreateRedirect()}/>}
			</View>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
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
	FoodPrint: {
		textAlign: 'center',
		margin: 15,
		color: 'white',
		fontSize: 25,
	},
	imageButton: {
        position: 'absolute',
        top: 15,
        left: 10,
        zIndex: 20,
    },
});

export default FoodTest;