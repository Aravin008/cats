import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RandomCat from './screens/RandomCat';
import CatImages from './screens/CatImages';
import Breeds from './screens/Breeds';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Images') {
              iconName = focused
                ? 'images'
                : 'images';
            } else if (route.name === 'Random Cat') {
              iconName = focused ? 'infinite' : 'infinite';
            } else if (route.name == 'Breeds') {
              iconName = focused ? 'images-outline' : 'images-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',})
        }
      >
        <Tab.Screen 
          name="Images" 
          component={CatImages} 
        />
        <Tab.Screen 
          name="Random Cat" 
          component={RandomCat} 
        />
         <Tab.Screen 
          name="Breeds" 
          component={Breeds} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
