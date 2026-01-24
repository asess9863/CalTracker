import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    const [SummedData, SetSummedData] = useState('')
    const [Success, setSuccess] = useState(false)

    async function Sum() {
		try {
            // fetch the Summed result of the logged calories for the day.
			const response = await fetch("http://10.0.0.157:5000/Sum",
				{ 
					method: "POST", 
					headers: {
						'Content-type': 'application/json',
						"Accept": "application/json"
					},
                    // pass username so that you can get the id based on that
					body: JSON.stringify({ UserName: 'Adam' })
				}
			)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			else
			{
                // store json result and place in the Summed data variable
				const result = await response.json();
                SetSummedData(result)
				setSuccess(true);
			}
		}
		catch (error) {
			console.error('Error sending data to Flask: ', error);
			Alert.alert("Error", "Failed to connect to server");
		}
	}
    // run the effect once on render, using empty brackets causes this to be rendered once every load
    useEffect(() => {Sum()}, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Home Page
                </Text>
                {/* This is conditional rendering built into the return. we only render the following if Success is true and SummedData is not null */}
                {/* This also is pulling from the SummedData results in their specific categories */}
                {!! Success && SummedData && <Text style={styles.FoodPrint}> Calories: {SummedData.results.Calories} </Text>}
                {!! Success && SummedData && <Text style={styles.FoodPrint}> Protein: {SummedData.results.Protein} </Text>}
                {!! Success && SummedData && <Text style={styles.FoodPrint}> Carbs: {SummedData.results.Carbs} </Text>}
                {!! Success && SummedData && <Text style={styles.FoodPrint}> Fats: {SummedData.results.Fats} </Text>}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        backgroundColor: 'black',
        padding: 10,
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
        padding: 25
    },
    FoodPrint: {
		textAlign: 'center',
		margin: 15,
		color: 'white',
		fontSize: 30,
        padding: 22
	},
});


export default Home;