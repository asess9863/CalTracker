import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
  <Tabs
    screenOptions={{ headerShown: false, tabBarStyle: {
        backgroundColor: '#0000001e',
        paddingTop: 10,
        height: 90
    },
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'grey',

 }}
  >
    <Tabs.Screen name="FindAFood" options={{ title: 'Find A Food'}}/>
    <Tabs.Screen name="Home" options={{ title: 'Home'}}/>
    <Tabs.Screen name="CreateFood" options={{ title: 'Create A Food'}}/>
    
  </Tabs>);
}