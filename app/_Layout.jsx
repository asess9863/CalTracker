import { Stack } from 'expo-router';

// a function to create a navigation stack that will hold all of the directions to the desired location
export default function RootLayout()
{
  // create loacations inside of the stack, called stackScreen objects
  // that hold the name of the place that we are being routed to
  return(
    <Stack>
      <StackScreen name="index"/>
      <StackScreen name="Home"/>
    </Stack>
  )
}