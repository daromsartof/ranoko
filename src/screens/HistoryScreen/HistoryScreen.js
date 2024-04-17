

import {StyleSheet, Text, SafeAreaView} from 'react-native'
import ContainerBackground from '../../components/ContainerBackground/ContainerBackground.js'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }  
})

const HistoryScreen = ({}) => {
  
  return (
    <SafeAreaView style={styles.container}>
      <ContainerBackground>
            <Text>Hello Historique</Text>
      </ContainerBackground>
    </SafeAreaView>
  )
}

export default HistoryScreen
