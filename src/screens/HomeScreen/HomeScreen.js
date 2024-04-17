import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  View,
  SafeAreaView,
  Image, Alert, Linking, Platform
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Icon from '../../../assets/images/logoRanoko.png'
import MenuBox from '../../components/MenuBox'
import { AuthContext } from '../../context/AuthContext'
import VersionCheck from 'react-native-version-check'
import { Text } from '@rneui/themed'
import { SECONDARY_COLOR, imageAssets } from '../../config'
import styles from './styles/style'

const HomeScreen = ({ }) => {
  /*  const {
      userInfo,
      isLoading,
      logout,
      fetchUserDossiers
    } = useContext(AuthContext)
    const [user, setUser] = useState({
      name: '',
      logo: null,
      primaryColor: 'white',
      secondaryColor: 'white'
    })
    const [loading, setLoading] = useState(false)
  
    const pickImage = async () => {
      setLoading(true)
      const response = await launchCamera({
        mediaType: 'photo',
        includeBase64: true,
        quality: Platform.OS === 'ios' ? 0.3 : 0.5,
      })
  
      if (response.didCancel) {
        console.log("L'utilisateur a annulé")
      } else if (response.error) {
        console.error('Erreur : ', response.error)
      } else {
        const { assets } = response
        if (assets) {
          if (assets.length > 0) {
            const asset = assets[0]
            const { base64 } = asset
            navigation.navigate('Sending', { image: base64 })
          }
        }
      }
      setLoading(false)
    }
  
    const showHistory = () => {
      navigation.navigate('History')
    }
  
    const showGed = () => {
      navigation.navigate('Ged')
    }
  
    // const showInProgress = () => {
    //   navigation.navigate('InProgress')
    // }
  
    const showPieceManquante = () => {
      navigation.navigate("Piecemanquante")
    }
  
    const showIndicateur = () => {
      navigation.navigate('Indicateur')
    }
  
  
    useEffect(() => {
      if (userInfo) {
  
        const { personnalization, token, idUser } = userInfo
        fetchUserDossiers(token)
        if (personnalization) {
          const { primaryColor, secondaryColor, logo } = personnalization
  
          const name = userInfo.lastName ? `${userInfo.lastName} ${userInfo.name}` : userInfo.name
  
          const tmpNames = name
            .split(' ')
            .map(n => n.charAt(0).toUpperCase() + n.slice(1))
  
          setUser({
            ...user,
            idUser,
            name: tmpNames.join(' '),
            primaryColor,
            secondaryColor,
            logo
          })
        }
      }
    }, [])
  
  
    const handleLogout = () => {
      Alert.alert("Voulez-vous enregistrer le mot de passe ?", "", [
        {
          text: "Non",
          onPress: () => logout(false, user.idUser),
          style: 'cancel'
        },
        { text: "Oui", onPress: () => logout(true) }
      ])
    }
    */
  return (
    <>
      <Spinner visible={false} />

      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={Icon}
          resizeMode="cover"
          style={styles.image}
          imageStyle={{ opacity: 0 }}
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
            <View style={{flex: 1, marginTop: 20}}>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.hakarano}
                  text="HAKA RANO"
                  onPress={() => { }}
                />
                <MenuBox
                  imgSrc={imageAssets.ireompakarano}
                  text="IREO MPAMPIASA RANO"
                  onPress={() => { }}
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
                  text="HAKA RANO"
                  onPress={() => { }}
                />
                <MenuBox
                  imgSrc={imageAssets.hakarano}
                  text="HAKA RANO"
                  onPress={() => { }}
                />
              </View>
            </View>
           
            {/**  <View style={styles.content}>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.hakarano}
                  text="HAKA RANO"
                  onPress={() => { }}
                />
              </View>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.imageSended}
                  text="RANOKO ANDROANY"
                  onPress={() => { }}
                />
              </View>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.ged}
                  text="IREO MPAMPIASA RANO"
                  onPress={() => { }}
                />
              </View>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.indicateurs}
                  text="VOLAKO"
                  onPress={() => { }}
                />
              </View>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.echeance}
                  text="BOITINDRAKITRA"
                  onPress={() => { }}
                />
              </View>
              <View style={styles.menuContainer}>
                <MenuBox
                  imgSrc={imageAssets.logout}
                  text="HIALA NY APPLICATION"
                  onPress={() => { }}
                />
              </View>
            </View>*/}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  )
}

export default HomeScreen
