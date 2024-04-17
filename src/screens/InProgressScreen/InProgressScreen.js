import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import DataBonitaIcon from '../../../assets/images/icon.jpg'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontFamily: 'Fontastique',
    fontWeight: 'bold',
    fontSize: 14
  }
})

const InProgressScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={DataBonitaIcon}
        resizeMode="cover"
        style={styles.image}
        imageStyle={{opacity: 0.1}}>
        <View style={styles.content}>
          <Icon name="gears" size={150} light />
          <Text style={styles.label}>Développement en cours ...</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default InProgressScreen
