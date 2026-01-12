import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import ImageButton from './ImageButton.jsx';

const Home = () => {
    function HomeDirect(){
        console.log('Pressed...');
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Home Page
                </Text>
                <Link href={"/"} style={styles.link}>back to login</Link>
            </SafeAreaView>
            <View style={styles.imageLocation}>
                <ImageButton 
                    style={styles.image} 
                    source={require('../assets/HomeIcon.png')}
                    onPress={() => {HomeDirect()}}/>
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
        flex: 1,
        padding: 24,
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
        font: 'times new romans',
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