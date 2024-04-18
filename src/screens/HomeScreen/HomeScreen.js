import React from 'react'
import {
  View,
  SafeAreaView,
  ScrollView
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from '../../../assets/images/logoRanoko.png'
import MenuBox from '../../components/MenuBox'
import { AuthContext } from '../../context/AuthContext'
import VersionCheck from 'react-native-version-check'
import { Text } from '@rneui/themed'
import { SECONDARY_COLOR, imageAssets } from '../../config'
import styles from './styles/style'

const HomeScreen = ({ navigation }) => {
  console.log(navigation)
  return (
    <>
      <Spinner visible={false} />

      <SafeAreaView style={styles.container}>
        <ScrollView
        >
          <View style={styles.image}>
            <View style={[styles.header, { paddingHorizontal: 20 }]}>
              <View style={[styles.userContainer]}>
                <Text style={styles.userText}>{"Romeo"}</Text>
              </View>
            </View>
            <View>
              <View style={styles.infoContainer}>
                <View style={styles.row}>
                  <Text style={styles.cell}>Ambim-bolako</Text>
                  <Text style={styles.cell}>2000 ar</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>Volako ani anaty boitindrakitra</Text>
                  <Text style={styles.cell}>3000 ar</Text>
                </View>
              </View>
              <View >
                <View>
                  <Text style={styles.ranotitle}>Rano laniko hatrizay</Text>
                </View>

                <View style={styles.indiceContainer}>
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{20} bido</Text>
                  </View>
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>15 litre</Text>
                  </View>
                </View>

              </View>
            </View>
            <View style={{
              flex: 1,
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
                  text="HAKA RANO"
                  onPress={() => { }}
                />
                <MenuBox
                  imgSrc={imageAssets.hakarano}
                  text="HAKA RANO"
                  onPress={() => { }}
                />
              </View>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.hakarano}
                  text="BOITINDRAKITRA"
                  onPress={() => navigation.navigate("BoitindrakitraScreen")}
                />
                <MenuBox
                  imgSrc={imageAssets.hakarano}
                  text="HAKA RANO"
                  onPress={() => { }}
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
