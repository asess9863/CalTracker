import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

const Home = () => {
    function HomeDirect(){
        router.push('/Home');
    }
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