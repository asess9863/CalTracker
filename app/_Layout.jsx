import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(Tabs)/Home" />
      <Stack.Screen name="BarcodeScan" />
      <Stack.Screen name="(Tabs)/FindAFood" />
    </Stack>
  );
}