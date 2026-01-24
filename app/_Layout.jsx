// using expo router stack for easy router.push('/Filename.jsx') commands
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(Tabs)/Home" options={{ headerShown: false }} />
      <Stack.Screen name="BarcodeScan" options={{ headerShown: false }} />
      <Stack.Screen name="(Tabs)/FindAFood" options={{ headerShown: false }} />
      <Stack.Screen name="(search)/[search]" options={{ headerShown: false }} />
      <Stack.Screen name="(scanner)/[barcode]" options={{ headerShown: false }} />
    </Stack>
  );
}