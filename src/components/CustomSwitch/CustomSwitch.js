import {View, Text, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import {Switch} from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    
  }
})

const CustomSwitch = () => {
  const [switchOn, setSwitchOn] = useState(true)
  return (
    <View style={styles.container}>
     
        <Text>Label</Text>
    
        <Switch value={switchOn} onValueChange={() => setSwitchOn(!switchOn)} />
     
    </View>
  )
}

export default CustomSwitch
