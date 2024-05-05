import { Button, Input, ListItem, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, ScrollView, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomInput from '../../components/CustomInput';
import TransactionHistory from '../../components/TransactionHistory';
import { imageAssets } from '../../config';
import BoitindrakitraService from './services/BoitindrakitraService';
import useToken from '../../hooks/useToken';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    margin: 0
  },
  image: {
    height: 200,
    resizeMode: 'contain'
  }
})

const BoitindrakitraScreen = ({ navigation }) => {
  const token = useToken()
  const [boitindrak, setBoitindrak] = useState({
    sum: 0,
    history: []
  })
  const handleGetBoitindrakitra = async () => {
    const boites = await BoitindrakitraService.getBoitindrakitra(token)
    console.log(boites)
    setBoitindrak(boites)
  }

  useEffect(() => {
    handleGetBoitindrakitra()
  }, [])

  return (

    <View >
      <View style={styles.container}>
        <Image
          source={imageAssets.boitindrakitra}
          style={styles.image}
        />
      </View>
      <View>
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: 'grey',
            margin: 10
          }}>
            <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>{boitindrak.sum} ar</Text>
          </View>
        </View>
        <View style={{
          height: '80%'
        }}>
          <TransactionHistory
            data={boitindrak.history}
          />
        </View>
      </View>

    </View>
  )
}

export default BoitindrakitraScreen
