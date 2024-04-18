import { Button, Input, ListItem, Text } from '@rneui/themed';
import React from 'react'
import { StyleSheet, Image, ScrollView, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomInput from '../../components/CustomInput';
import TransactionHistory from '../../components/TransactionHistory';
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

const BoitindrakitraScreen = ({ navigation }) => {

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
            <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>30 000 ar</Text>
          </View>
        </View>
        <View style={{
          height: 350
        }}>
          <TransactionHistory
            data={[1, 2, 3, 4, 5, 6, 7]}
          />
        </View>
        <Button title="Ny Fandehambola rehetra" type="outline" onPress={() => navigation.navigate('BoitindrakitraHistoryScreen')} />
      </View>

    </ScrollView>
  )
}

export default BoitindrakitraScreen
