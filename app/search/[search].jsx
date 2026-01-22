import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Alert, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, useLocalSearchParams } from 'expo-router';
import AppButton from '../AppButton';

const FoodTest = () => {
    const { search } = useLocalSearchParams();
	const [foodData, setFoodData] = useState(null);
	const [Success, setSuccess] = useState(false)

	async function Attempt() {
		try {
			const response = await fetch("http://10.7.41.135:5000/search",
				{ 
					method: "POST", 
					headers: {
						'Content-type': 'application/json',
						"Accept": "application/json"
					},
					body: JSON.stringify({ title: search })
				}
			)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			else
			{
				const result = await response.json();
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

	useEffect(() => {Attempt()}, [search]);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.Topcontainer}>

				<Text style={styles.title}>Searching for: {search}</Text>

				<View style={styles.Centercontainer}>
					{!! Success && foodData && <Text style={styles.FoodPrint}> Name: {foodData.name} </Text>}
					{!! Success && foodData && <Text style={styles.FoodPrint}> Calories: {foodData.calories} </Text>}
					{!! Success && foodData && <Text style={styles.FoodPrint}> Protein: {foodData.protein} </Text>}
					{!! Success && foodData && <Text style={styles.FoodPrint}> Carbs: {foodData.carbs} </Text>}
					{!! Success && foodData && <Text style={styles.FoodPrint}> Fats: {foodData.fats} </Text>}
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	Topcontainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'top',
		backgroundColor: 'black',
		padding: 24,
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
	FoodPrint: {
		textAlign: 'center',
		margin: 15,
		color: 'white',
		fontSize: 25,
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
	link: {
		textAlign: 'center',
		marginTop: 12,
		color: 'white',
	},
	imageLocation:
	{
		alignItems: 'center',
		justifyContent: 'bottom',
	},
	image:
	{
		width: 75,
		height: 75,
		justifyContent: 'flex-end',
	},
});

export default FoodTest;