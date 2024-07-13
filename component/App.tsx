import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as  Yup from 'yup'

const PasswordSchema = Yup.object().shape({
    passwordLength:Yup.number()
    .min(4,'should be min of 4 characters')
    .max(16,'should be max of 16 characters')
    .required('password is required'),
    
})

export default function App() {
  return (
    <View>
      <Text style={styles.text}>app</Text>
      <Text  style={styles.text}>Raj Kumar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text:{
        fontSize: 24,
        color: 'white',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase'  // Capitalize the first letter of each word. This will make the text more visually appealing.
    }

})