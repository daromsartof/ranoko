import {
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'
import React from 'react'
import { imageAssets, SECONDARY_COLOR } from '../../config'
import { Text } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BarChart } from 'react-native-gifted-charts'

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
  }
})

const UserProfileScreen = () => {
  const data = [

    { value: 20, label: 'M' },

    { value: 30, label: 'T' },

    {

      value: 50,

      label: 'W',

      topLabelComponent: () => (

        <Text style={{ color: 'blue', fontSize: 18, marginBottom: 6 }}>50</Text>

      ),

    },

    { value: 40, label: 'T' },

    { value: 30, label: 'F' },

  ];
  return (

    <ScrollView>
      <View style={{ padding: 20 }}>
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: "flex-start",
          padding: 0,
          margin: 0,
        }}>
          <Image
            source={imageAssets.hakaranoIllustration}
            style={styles.image}
          />
        </View>
        <View>
          <View style={{
            marginTop: 10
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold'
            }}>Romeo Ercka</Text>
            <Text>
              Alona ao atrano <Text>1</Text>
            </Text>
          </View>
          <View style={{
            marginTop: 10,
            justifyContent: 'center',
            padding: 20,
            borderColor: "#000000",
            borderWidth: 1,
            borderRadius: 10
          }}>
            <Text style={{
              textAlign: "center",
              fontSize: 20,
              textDecorationStyle: "solid",
              textDecorationColor: "#0000",
              textDecorationLine: "underline",
            }}>Vidindrano mbola tsy voaloha</Text>
            <View style={{ marginTop: 20 }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center'
              }}>
                20 000 ar
              </Text>
            </View>
          </View>
          <View style={{
            marginTop: 30
          }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center'
              }}
            >
              Ny fihilany rano isanandro
            </Text>
            <View>
              <BarChart width={300} data={data} frontColor={SECONDARY_COLOR} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>

  )
}

export default UserProfileScreen
