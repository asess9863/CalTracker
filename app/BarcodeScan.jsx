import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function BarcodeScan() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const router = useRouter();

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    We need your permission to use the camera
                </Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }
    async function lookupFood(barcode) {
        const res = await fetch(
            `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
        );
        const data = await res.json();

        if (data.status === 1) {
            console.log("Food:", data.product.product_name);
        }
    }

    const handleBarcodeScanned = ({ data }) => {
        if (scanned) return;   // prevent multiple scans

        setScanned(true);
        console.log("Scanned barcode:", data);

        lookupFood(data);

        router.push('/FindAFood');
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
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center',
        zIndex: 10,
    },
    imageButton: {
        position: 'absolute',
        top: 15,
        left: 10,
        zIndex: 20,
    },
    image: {
        width: 48,
        height: 48,
        resizeMode: 'contain',
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
