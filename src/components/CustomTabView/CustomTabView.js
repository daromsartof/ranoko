import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Tab } from '@rneui/themed'
import useColor from '../../hooks/useColor'

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  }
})

const CustomTabView = ({ children, items = [] }) => {
  const [index, setIndex] = useState(1)
  const [primaryColor] = useColor(true)

  return (
    <View>
      <Tab value={index} onChange={setIndex} dense indicatorStyle={{
        backgroundColor: primaryColor.frontColor,
        height: 3,
      }} 
      >
        {items.map((item, i) => (
          <Tab.Item  titleStyle={{ fontSize: 12, color: "black" }} key={i}>{item}</Tab.Item>
        ))}
      </Tab>
      <View style={styles.container}>
        {Array.isArray(children) ? children[index] : children}
      </View>
    </View>
  )
}

export default CustomTabView
