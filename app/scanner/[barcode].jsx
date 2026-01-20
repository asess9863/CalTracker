import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, router, useLocalSearchParams } from 'expo-router';

const FoodDisplay = () => {
    const { barcode } = useLocalSearchParams();
    const [product, setProduct ] = useState(null);
    const [loading, setLoading] = useState(true);

    const GetData = async () => {
        try 
        {
            const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`)
            const data = await res.json()
            if(data.status === 1)
            {
                setProduct(data.product)
            } else {
                console.log('Product Not Found...')
            }
        }
        catch(err){
            console.log("data fetch Failed: ", err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {GetData()}, [barcode]);

    if (loading) 
    {
        return <Text>Loading...</Text>;
    }

    if(product === null)
    {
        return <Text style={styles.title}>Food Not Found!!</Text>
    }

    console.log(product.nutriments["energy-kcal_serving"])

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Text style={styles.FoodPrint}> FoodDisplay Page </Text>
                <Text style={styles.FoodPrint}> Name: {product.product_name} </Text>
                <Text style={styles.FoodPrint}> ServingSize: {product.serving_size} </Text>
                <Text style={styles.FoodPrint}> Calories: {product.nutriments["energy-kcal_serving"]} </Text>
                <Text style={styles.FoodPrint}> Protein: {product.nutriments["proteins_serving"]} </Text>
                <Text style={styles.FoodPrint}> Carbs: {product.nutriments["carbohydrates_serving"]} </Text>
                <Text style={styles.FoodPrint}> Fats: {product.nutriments["fat_serving"]} </Text>
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
});


export default FoodDisplay;