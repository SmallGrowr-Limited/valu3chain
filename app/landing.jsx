import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'


const LandingPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>LandingPage</Text>
    </SafeAreaView>
  );
}

export default LandingPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})