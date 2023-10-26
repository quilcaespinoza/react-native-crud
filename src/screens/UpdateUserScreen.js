import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import apiConfig from '../Config/Config.js';

const UpdateUserScreen = ({ route, navigation }) => {
  const { userDni } = route.params;
  const [user, setUser] = useState([]);
  const [newPerson, setNewPerson] = useState({
    dni: '',
    name: '',
    last_name: '',
    second_last_name: '',
    birthdate: '',
    phone: '',
    email: '',
  });
  const apiUrl = apiConfig.apiUrl;

  useEffect(() => {
    fetch(`${apiUrl}/user/${userDni}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data); 
      })
      .catch((error) => {
        console.error('Error al cargar los datos del usuario:', error);
      });
  }, [userDni]);

  const handleUpdate = () => {
    let statusResponse = 200;
    fetch(`${apiUrl}/user/${userDni}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then((response) => {
      if(response.status != 200) {
        statusResponse = response.status
        console.log("status ", statusResponse)
        return response.json()
      
      }else {
        Alert.alert('Éxito', 'Se actualizó la información exitosamente');
        navigation.goBack();
      }
    })
    .then((data) => {
       console.log("data ",  data)
      if (statusResponse != 200) {
        Alert.alert('Error', data.error);
      }       
      
    })
    .catch((error) => {
      console.error('Error al realizar la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema al realizar la solicitud.');
    });
  };

  return (
    <View>
      
      <TextInput
        placeholder="DNI"
        value={user.dni}
        onChangeText={(text) => setUser({ ...user, dni: text.replace(/[^0-9]/g, '') })}
        style={{ color: 'black' }}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Nombre"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text.replace(/[^a-zA-Z ]/g, '') })}
        style={{ color: 'black' }}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Apellido Paterno"
        value={user.last_name}
        onChangeText={(text) => setUser({ ...user, last_name: text.replace(/[^a-zA-Z ]/g, '') })}
        style={{ color: 'black' }}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Apellido Materno"
        value={user.second_last_name}
        onChangeText={(text) => setUser({ ...user, second_last_name: text.replace(/[^a-zA-Z ]/g, '') })}
        style={{ color: 'black' }}
        placeholderTextColor="gray"
      />
      <Text style={{ color: 'grey', fontWeight : 'bold' }}>Fecha de nacimiento Formato(Año - dia - mes)</Text>

      
      <TextInput
        placeholder="Fecha de Nacimiento"
        value={user.birthdate}
        onChangeText={(text) => setUser({ ...user, birthdate: text })}
        style={{ color: 'black' }}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Teléfono"
        value={user.phone}
        onChangeText={(text) => setUser({ ...user, phone: text.replace(/[^0-9]/g, '') })}
        style={{ color: 'black' }}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Correo Electrónico"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
        style={{ color: 'black' }}
        placeholderTextColor="gray"
      />
      <Button title="Guardar Cambios" onPress={handleUpdate} />
    </View>
  );
};

export default UpdateUserScreen;
