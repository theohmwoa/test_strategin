import React, { useState, useEffect } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import { DataTable } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native'
import { theme } from '../core/theme'

export default function Dashboard({ route, navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    var requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + route.params.user_token},
        redirect: 'follow'
    };
    fetch("http://localhost:5000/users", requestOptions)
    .then(response => response.json())
    .then(data => {
        setData(data);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Background>
        <Header>Loading...</Header>
      </Background>
    )
  }

  
  return (
    <Background>
      <Header>Users</Header>
      <DataTable style={styles.container}>
        <DataTable.Header>
        <DataTable.Title>Username</DataTable.Title>
        <DataTable.Title>Email</DataTable.Title>
        </DataTable.Header>

        <ScrollView >
          {data.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.username}</DataTable.Cell>
                <DataTable.Cell>{item.email}</DataTable.Cell>
              </DataTable.Row>
          ))}
        </ScrollView>

        

  </DataTable>
      <Button mode="contained"
        onPress={() => navigation.replace('LoginScreen')}>
        Logout
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: 20,
    maxHeight: '70%',
  },
})
