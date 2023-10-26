import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import apiConfig from '../Config/Config.js';

const CreatePersonScreen = ({ navigation }) => {
  const apiUrl = apiConfig.apiUrl;
  const [newUser, setNewUser] = useState({
    dni: '',
    name: '',
    last_name: '',
    second_last_name: '',
    birthdate: '',
    phone: '',
    email: '',

  });

  const handleCreate = () => {
    let statusResponse = 200;
    fetch(`${apiUrls}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if(response.status != 200) {
          statusResponse = response.status
          return response.json()
        
        }else {
          Alert.alert('Éxito', 'Usuario creado exitosamente');
          navigation.goBack();
        }
      })
      .then((data) => {
      
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
        value={newUser.dni}
        style={{ color: 'black' }}
        placeholderTextColor="gray"
        onChangeText={(text) => setNewUser({ ...newUser, dni: text.replace(/[^0-9]/g, '') })}
       
      />
      <TextInput
        placeholder="Nombre"
        value={newUser.name}
        style={{ color: 'black' }}
        onChangeText={(text) => setNewUser({ ...newUser, name: text.replace(/[^a-zA-Z ]/g, '') })}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Apellido Paterno"
        value={newUser.last_name}
        style={{ color: 'black' }}
        onChangeText={(text) => setNewUser({ ...newUser, last_name: text.replace(/[^a-zA-Z ]/g, '') })}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Segundo Apellido"
        value={newUser.second_last_name}
        onChangeText={(text) => setNewUser({ ...newUser, second_last_name: text.replace(/[^a-zA-Z ]/g, '') })}
        placeholderTextColor="gray"
        style={{ color: 'black' }}
      />
      <Text style={{ color: 'grey', fontWeight : 'bold' }}>Fecha de nacimiento Formato(Año - dia - mes)</Text>

      <TextInput
        placeholder="YYY-mm-dd"
        style={{ color: 'black' }}
        value={newUser.birthdate}
        onChangeText={(text) => setNewUser({ ...newUser, birthdate: text })}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Teléfono"
        value={newUser.phone}
        onChangeText={(text) => setNewUser({ ...newUser, phone: text.replace(/[^0-9]/g, '') })}
        placeholderTextColor="gray"
        style={{ color: 'black' }}
      />
      <TextInput
        placeholder="Email"
        style={{ color: 'black' }}
        value={newUser.email}
        onChangeText={(text) => setNewUser({ ...newUser, email: text })}
        placeholderTextColor="gray"
      />
      {/* Agrega más inputs para los campos adicionales aquí */}
      <Button title="Guardar" onPress={handleCreate} />
    </View>
  );
};

export default CreatePersonScreen;
