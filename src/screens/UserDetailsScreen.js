import React from 'react';
import { View, Text, Button } from 'react-native';

const UserDetailsScreen = ({ route, navigation }) => {
  const { user, updateUser } = route.params;

  const handleEdit = () => {
    // Navegar a la pantalla de actualización con los detalles del usuario y la función de actualización
    navigation.navigate('UpdateUser', { user, updateUser });
  };

  return (
    <View>
      <Text>Detalles de Usuario</Text>
      <Text>Nombre: {user.name}</Text>
      <Text>Apellido Paterno: {user.last_name}</Text>
      <Text>Apellido Materno: {user.second_last_name}</Text>
      <Text>Fecha de Nacimiento: {user.birthdate}</Text>
      <Text>Teléfono: {user.phone}</Text>
      <Text>Correo Electrónico: {user.email}</Text>
      <Button title="Editar Usuario" onPress={handleEdit} />
    </View>
  );
};

export default UserDetailsScreen;
