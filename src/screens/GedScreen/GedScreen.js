
import React from 'react'
import {
  SafeAreaView,

  StyleSheet,
  View

} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  filtre: {
    flex: 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10
    // marginBottom: 10
  },
  filtreContent: {
    width: '48%',
    height: '30%'
    // borderStyle:'dashed',
    //  borderBottomWidth: 23
  },
  tableHeader: {
    justifyContent: 'flex-start'
  },
  cell: {
    fontSize: 12
  },
  table: {
    flex: 0.9
  },
  customImageBoxcontainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  customImageContent: {
    margin: 5
  },
  label: {
    fontSize: 15
  }
})


const GedScreen = ({ }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Hello GED</Text>
      </View>
    </SafeAreaView>
  )
}

export default GedScreen
