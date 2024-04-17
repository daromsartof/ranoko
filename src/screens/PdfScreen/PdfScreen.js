import React  from 'react'
import {StyleSheet, Image, ScrollView, View} from 'react-native'

import {SafeAreaView} from 'react-native-safe-area-context'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  image: {
    width:'100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContainer: {
    flex: 1
  }
})

const PdfScreen = ({}) => {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Pdf</Text>
      </View>
    </SafeAreaView>
  )
}

export default PdfScreen
