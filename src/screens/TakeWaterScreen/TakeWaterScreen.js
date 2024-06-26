import { Button, Input, Text } from '@rneui/themed';
import React from 'react'
import { StyleSheet, Image, ScrollView, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { imageAssets } from '../../config';
import { useState } from 'react';
import useToken from '../../hooks/useToken';
import TakeWaterService from './TakeWaterService';
import ModalMessage from '../../components/common/modal/ModalMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    margin: 0
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  image: {
    height: 200,
    resizeMode: 'contain'
  },
  scrollContainer: {
    flex: 1
  }
})

const TakeWaterScreen = ({navigation }) => {
  const [waterCount, setWaterCount] = useState("")
  const token = useToken()
  const [isLoading, setIsLoading] = useState(false)
  const [modale, setModal] = useState({
    isVisible: false,
    message: ''
  })
  const handleChange = (data) => {
    setWaterCount(data)
  }
  const toast = useToast()

  const handleClickSubmit = async () => {
    if(!waterCount || isNaN(parseInt(waterCount)) ) return 
    setIsLoading(true)
    const water = await TakeWaterService.takeWaterToday({
      number: parseInt(waterCount)
    }, token)

    if (water) {
      setWaterCount("")
      setModal(() => {
        return {
          message: `tontosa somatsara ny fakanao rano ${water.rano?.number} bidao @ vidiny ${water.rano?.number * 50} ar`,
          isVisible: true
        }
      })
    } else {
      toast.show(`nisy tsy fahatomombanana`, {
        type: 'danger',
        placement: 'top',
        animationType: 'zoom-in'
      })
    }
    setIsLoading(false)
  }
  const handleClickOkModal = () => {
    setModal((modal) => {
      return {
        ...modal,
        isVisible: false
      }
    })
    navigation.navigate('Home')
  }
  return (
    <ScrollView >
      <View style={styles.container}>
        <Image
          source={imageAssets.hakarano}
          style={styles.image}
        />
      </View>
      <View>
        <View>
          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={{fontSize: 20, textAlign: "center"}}>
                Ny etap arahina ra haka rano
              </Text>
              <View style={{margin: 10}}>
                <Text style={{paddingVertical: 4}}>
                  - Ampidiro we firy bidao ni alainao
                </Text>
                <Text style={{paddingVertical: 4}}>
                  - Tsindrio ny ok
                </Text>
                <Text style={{paddingVertical: 4}}>
                  - Refa vita zai de mihena ni ambimbola nao ani @ mpitambola ra ohatra ka mbola misy 
                </Text>
                <Text style={{paddingVertical: 4}}>
                  - Ra tsisy vola tsony enao ani @ mpitambola de lasa negatifa ni volanao de hanana trosa zani anao
                </Text>
              </View>
             
            </View>
           <View style={{padding: 10}}>
           <Input
              placeholder="Firy Bidao"
              style={{ textAlign: "center" }}
              value={waterCount}
              keyboardType='number-pad'
              onChangeText={text => handleChange(text)}
            />
            <Button  
              title={isLoading ? "miandrasa kely ..." : "ok"}
              type="outline" 
              onPress={handleClickSubmit}
            />
          </View>
           </View>
           
        </View>
        <ModalMessage
          modalVisible={modale.isVisible}
          message={modale.message}
          setModalVisible={handleClickOkModal}
        />
      </View>
      
    </ScrollView>
  )
}

export default TakeWaterScreen
