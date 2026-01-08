import { Stack } from 'expo-router';

export default function RootLayout()
{
  return(
    <Stack>
      <StackScreen name="index"/>
      <StackScreen name="Home"/>
    </Stack>
  )
}