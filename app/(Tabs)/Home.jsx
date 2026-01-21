import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

const Home = () => {
    async function Sum() {
		try {
			const response = await fetch("http://10.0.0.157:5000/Sum",
				{ 
					method: "POST", 
					headers: {
						'Content-type': 'application/json',
						"Accept": "application/json"
					},
					body: JSON.stringify({ UserName: 'Adam' })
				}
			)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			else
			{
				const result = await response.json();
				Alert.alert('Success', 'Data sent and response received!')
				setSummedData(result.food);
				setSuccess(true);
			}
		}
		catch (error) {
			console.error('Error sending data to Flask: ', error);
			Alert.alert("Error", "Failed to connect to server");
		}
	}

    useEffect(() => {Sum()});
    

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Home Page
                </Text>
                <Link href={"/"} style={styles.link}>back to login</Link>
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
        padding: 24,
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
    },
    input: {
        height: 40,
        margin: 15,
        borderWidth: 4,
        borderColor: 'white',
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


export default Home;