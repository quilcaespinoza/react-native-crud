import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { List, Divider } from 'react-native-paper';
import apiConfig from '../Config/Config.js';

const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const apiUrl = apiConfig.apiUrl;


  const loadData = () => {
    fetch(`${apiUrl}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
      });
  };


  useEffect(() => {
    loadData();

    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, []);



  useEffect(() => {
    console.log("users actualizado:", users);
  }, [users]);

  const handleDelete = (dni) => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            fetch(`${apiUrl}/user/${dni}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                if (response.status === 200) {
                  Alert.alert("Usuario eliminado con éxito")
                  loadData();
                } else {
                  Alert.alert('Error al eliminar el usuario');
            
                }
              })
              .catch((error) => {
                console.error('Error al realizar la solicitud DELETE:', error);
              });
          },
        },
      ]
    );
    loadData();
  };

  
  


  return (
    <View>
      <Text>Lista de Personas</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.dni}
        renderItem={({ item }) => (
          <View>
            <List.Item
              title={`${item.name} ${item.last_name} ${item.second_last_name}`}
              description={`DNI: ${item.dni}`}
              right={(props) => (
                <View style={{ flexDirection: 'row' }}>
                <Button
                  title="Eliminar"
                  onPress={() => handleDelete(item.dni)}
                />
                <View style={{ width: 10 }} /> 
                <Button
                  title="Editar"
                  onPress={() => navigation.navigate('Actualizar Usuario', { userDni: item.dni })}
                />
              </View>
              
                
              )}

            />
            <Divider />
          </View>
        )}
      />
      <Button
        title="Crear Usuario"
        onPress={() => navigation.navigate('Crear Usuario')}
      />
    </View>
  );
};

export default HomeScreen;
