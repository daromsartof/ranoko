import { Button, Input, Text } from '@rneui/themed';
import React from 'react'
import { StyleSheet, Image, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomInput from '../../components/CustomInput';
import { imageAssets } from '../../config';

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

const TakeWaterScreen = ({ }) => {

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
            />
            <Button  title="Ok" type="outline" />
          </View>
           </View>
           
        </View>
      </View>

    </ScrollView>
  )
}

export default TakeWaterScreen
