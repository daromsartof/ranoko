import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Navigation from './src/components/Navigation'
import { AuthProvider } from './src/context/AuthContext'
import { ToastProvider } from 'react-native-toast-notifications'
import './src/prototype.js'

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})

const App = () => {
  

  return (
    <SafeAreaView style={styles.root}>
      <ToastProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </ToastProvider>
    </SafeAreaView>
  )
}

export default App
