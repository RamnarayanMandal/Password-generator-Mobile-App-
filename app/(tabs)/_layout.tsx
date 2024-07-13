import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import App from '@/component/App'


export default function _layout() {
  return (
    <View style={styles.main}>
      <App/>
    </View>
  )
}

const styles = StyleSheet.create({
   main:{
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    color:'white'

    
   }
   
})