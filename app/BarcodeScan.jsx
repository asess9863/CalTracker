import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function BarcodeScan() {
    // use camera permissions makes a call to the phone settings to see if the permissions are turned off so we can do conditional rendering
    const [permission, requestPermission] = useCameraPermissions(); 
    const [scanned, setScanned] = useState(false);
    const router = useRouter();

    // conditional rendering for camera permissions
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    We need your permission to use the camera
                </Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.text}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // pass in barcode scanned
    const handleBarcodeScanned = ({ data }) => {
        if (scanned) return;   // prevent multiple scans

        setScanned(true); // update after scan happen so that we can limit the numbers of times we send a code
        // send code to [barcode].jsx via dynamic file name
        router.push(`scanner/${data}`)
    };

    return (
        <View style={styles.container}>

            <CameraView
                style={styles.camera}
                onBarcodeScanned={handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
                }}
            />

            {/* Scan frame */}
            <View style={styles.scanFrame} />

            {/* Cancel button */}
            <TouchableOpacity
                style={styles.imageButton}
                onPress={() => router.push('/FindAFood')}
            >
                <AntDesign name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    imageButton: {
        position: 'absolute',
        top: 15,
        left: 10,
        zIndex: 20,
    },
    button: {
        backgroundColor: '#000000aa',
        padding: 12,
        borderRadius: 10,
        align: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
