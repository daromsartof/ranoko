import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from '../../../assets/images/logoRanoko.png'
import MenuBox from '../../components/MenuBox'
import { AuthContext } from '../../context/AuthContext'
import VersionCheck from 'react-native-version-check'
import { Text } from '@rneui/themed'
import { SECONDARY_COLOR, imageAssets } from '../../config'
import styles from './styles/style'
import HomeService from './services/HomeService'

const HomeScreen = ({ navigation }) => {
  const {
    userInfo,
    logout
  } = useContext(AuthContext)
  const [caisse, setCaisse] = useState({
    amount: 0
  })

  const [myWater, setMyWater] = useState({
    all: 0,
    today: 0,
    details: []
  })

  const handleFetshCaisse = async () => {
    setCaisse(await HomeService.getMyCaisse(userInfo.token))
    setMyWater(await HomeService.getMyWaterHistory(userInfo.token))
  }

  const handLogout = () => {
    Alert.alert('Tena Hiala ve ?', "", [
      {
        text: 'Aaka',
        onPress: () => { },
        style: 'cancel'
      },
      { text: 'Eny', onPress: () => logout() }
    ])
  }
  useEffect(() => {
    handleFetshCaisse()
  }, [navigation])

  return (
    <>
      <Spinner visible={false} />

      <SafeAreaView style={styles.container}>
        <ScrollView
        >
          <View style={styles.image}>
            <View style={[styles.header, { paddingHorizontal: 20 }]}>
              <View style={[styles.userContainer]}>
                <Text style={styles.userText}>{userInfo.user.name}</Text>
              </View>
            </View>
            <View>
              <View style={styles.infoContainer}>
                <View style={styles.row}>
                  <Text style={styles.cell}>Ambim-bolako</Text>
                  <Text style={[styles.cell, {
                    color: caisse.amount < 0 ? 'red' : '#000',
                    textAlign: 'center'
                  }]}>{caisse.amount} ar</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Vola laniko androany</Text>
                  <Text style={[styles.cell, {
                    color: caisse.amount < 0 ? 'red' : '#000',
                    textAlign: 'center'
                  }]}>{myWater.today  * 50} ar</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Vola laniko hatrizay</Text>
                  <Text style={[styles.cell, {
                    color: caisse.amount < 0 ? 'red' : '#000',
                    textAlign: 'center'
                  }]}>{myWater.all  * 50} ar</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Fitambaran'ny volako ani anaty boitindrakitra</Text>
                  <Text style={[styles.cell, { textAlign: 'center' }]}>3000 ar</Text>
                </View>
              </View>
              <View >
                <View>
                  <Text style={styles.ranotitle}>Rano laniko Androany</Text>
                </View>

                <View style={styles.indiceContainer}>
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{myWater.today} bidao / {myWater.today  * 20} litatra</Text>
                  </View>
                </View>

              </View>
              <View >
                <View>
                  <Text style={styles.ranotitle}>Rano laniko hatrizay</Text>
                </View>

                <View style={styles.indiceContainer}>
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{myWater.all} bidao / {myWater.all * 20} litatra</Text>
                  </View>
                </View>

              </View>
            </View>
            <View style={{
              flex: 1
            }}>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.hakarano}
                  text="HAKA RANO"
                  onPress={() => navigation.navigate("TakeWaterScreen")}
                />
                <MenuBox
                  imgSrc={imageAssets.ireompakarano}
                  text="IREO MPAMPIASA RANO"
                  onPress={() => navigation.navigate("ListUserScreen")}
                />
              </View>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.hakarano}
                  text="FANDEHANY VOLAKO"
                  onPress={() => navigation.navigate('HistorySreen')}
                />
                <MenuBox
                  imgSrc={imageAssets.hakarano}
                  text="HANAO RECHARGE"
                  onPress={() => { }}
                />
              </View>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.boitindrakitra}
                  text="BOITINDRAKITRA"
                  onPress={() => navigation.navigate("BoitindrakitraScreen")}
                />
                <MenuBox
                  imgSrc={imageAssets.logout}
                  text="HIALA NY APPLICATION"
                  onPress={handLogout}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default HomeScreen
