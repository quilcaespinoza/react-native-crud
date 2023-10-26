import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'; 
import CreateUserScreen from './src/screens/CreateUserScreen';
import UpdateUserScreen from './src/screens/UpdateUserScreen';


const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Crear Usuario" component={CreateUserScreen} />
        <Stack.Screen name="Actualizar Usuario" component={UpdateUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
