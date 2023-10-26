import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen'; 
import CreateUserScreen from '../screens/CreateUserScreen';
import UpdateUserScreen from '../screens/UpdateUserScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Lista de Usuarios',
      },
    },
    CreatePerson: {
      screen: CreateUserScreen,
      navigationOptions: {
        title: 'Crear Usuario',
      },
    },
    UpdatePerson: {
      screen: UpdateUserScreen,
      navigationOptions: {
        title: 'Editar Usuario',
      },
    },
    PersonDetails: {
      screen: UserDetailsScreen,
      navigationOptions: {
        title: 'Detalles de Usuario',
      },
    },
  },
  {
    initialRouteName: 'Home', 
  }
);

export default createAppContainer(AppNavigator);
