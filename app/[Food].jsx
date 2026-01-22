import { useEffect, useState } from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const logFood = () => {
    const { Food } = useLocalSearchParams();
    const [ServingsText, SetServingsText] = useState('')
    return(
        <SafeAreaProvider>
            <View style={styles.container}>
                <AntDesign name="arrow-left" size={24} color="white" />
            </View>
            <View style={styles.Topcontainer}>
                <Text style={styles.title}> Logging { Food } </Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#ffffffff'}
                    onChangeText={SetServingsText}
                    placeholder='Enter Servings Eaten'
                    value={ServingsText}
                />
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