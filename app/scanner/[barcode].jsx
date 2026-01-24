import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import AppButton from '../AppButton';

const FoodDisplay = () => {
    // pull barcode from file name from the redirect in BarcodeScan.jsx
    const { barcode } = useLocalSearchParams();
    const [product, setProduct ] = useState(null);

    async function LogRedirect(){
		try {
            // fetch a search with the name of the product scanned
            const response = await fetch("http://10.0.0.157:5000/search",
                { 
                    method: "POST", 
                    headers: {
                        'Content-type': 'application/json',
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({ Name: product.product_name })
                }
            )
            // if there isn't a response we want to add the food that is scanned to the data base so it can be found via searching
            if (!response.ok) {
                try {
                        const response = await fetch("http://10.0.0.157:5000/CreateFood",
                          { 
                            method: "POST", 
                            headers: {
                              'Content-type': 'application/json',
                              "Accept": "application/json"
                            },
                            body: JSON.stringify({ "Name" : product.product_name,
                                                   "Calories" : product.nutriments["energy-kcal_serving"],
                                                   "Protein" : product.nutriments["proteins_serving"],
                                                   "Carbs" : product.nutriments["carbohydrates_serving"],
                                                   "Fats" : product.nutriments["fat_serving"]
                            })
                          }
                        )
                        if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        else
                        {
                          router.push(`../${product.product_name}`)
                        }
                    }
                catch (error) {
                console.error('Error sending data to Flask: ', error); }
                        
            }
            // if its successful we push to [Food].jsx with the products name
            else
            {
                router.push(`../${product.product_name}`)
            }
        }
        catch (error) {
            console.error('Error sending data to Flask: ', error);
            Alert.alert("Error", "Failed to connect to server");
        }
	}

    // function used to API call to external database openfoodfacts
    const GetData = async () => {
        try 
        {
            const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`)
            const data = await res.json()
            if(data.status === 1)
            {
                // set the product
                setProduct(data.product)
            } else {
                console.log('Product Not Found...')
            }
        }
        catch(err){
            console.log("data fetch Failed: ", err)
        }
    };

    // run this on render with barcode as the param
    useEffect(() => {GetData()}, [barcode]);

    if(product === null)
    {
        return <Text style={styles.title}>Food Not Found!!</Text>
    }


    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TouchableOpacity style={styles.imageButton} onPress={() => router.push('/FindAFood')}>
                    <AntDesign name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.FoodPrint}> FoodDisplay Page </Text>
                <Text style={styles.FoodPrint}> Name: {product.product_name} </Text>
                <Text style={styles.FoodPrint}> ServingSize: {product.serving_size} </Text>
                <Text style={styles.FoodPrint}> Calories: {product.nutriments["energy-kcal_serving"]} </Text>
                <Text style={styles.FoodPrint}> Protein: {product.nutriments["proteins_serving"]} </Text>
                <Text style={styles.FoodPrint}> Carbs: {product.nutriments["carbohydrates_serving"]} </Text>
                <Text style={styles.FoodPrint}> Fats: {product.nutriments["fat_serving"]} </Text>
                <AppButton title='Log This Food?' onPress={() => LogRedirect()}/>
            </View>
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


export default FoodDisplay;