import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', backgroundColor: '#06bcee' }
})

const SplashScreen = () => {
    return (
        <View
            style={styles.container}>
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
    )
}

export default SplashScreen