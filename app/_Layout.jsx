import { Stack } from 'expo-router';

export default function RootLayout()
{
  return(
    SplashScreen.SetOptions
    ({
        duration: 1000,
        fade: true,
    }),
    <Stack>
      <StackScreen name="index"/>
      <StackScreen name="Home"/>
    </Stack>
  )
}