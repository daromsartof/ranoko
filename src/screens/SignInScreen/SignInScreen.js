import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {  Image, View, ScrollView } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import CustomPasswordInput from '../../components/CustomInput/CustomPasswordInput'
import { SECONDARY_COLOR } from '../../config.js'
import { AuthContext } from '../../context/AuthContext'
import Icon from '../../../assets/images/logoRanoko.png'
import { useToast } from 'react-native-toast-notifications'
import styles from './styles/style.js'

const SignInScreen = () => {
  const { isLoading, login } = useContext(AuthContext)

  const { control, handleSubmit } = useForm()

  const toast = useToast()

  const onSignInPressed = data => {
    login(data).catch(err => {
      toast.show(
        err.status === 401 ? "Adresse e-mail ou mot de passe n'est pas valide" : "Une erreur s'est produite", {
        type: 'danger',
        placement: 'top',
        animationType: 'zoom-in'
      })
    })

  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageContainer}><Image style={styles.image} source={Icon} /></View>
      </View>

      <View style={styles.body}>
        <View>
          <CustomInput
            control={control}
            placeholder="Email"
            name="username"
            rules={{
              required: `Login obligatoire`
            }}
            secureTextEntry={false}
          />

          <CustomPasswordInput
            control={control}
            placeholder="Mot de passe"
            name="password"
            rules={{
              required: 'Le mot de passe est obligatoire',
              minLength: {
                value: 3,
                message: 'Le mot de passe doit contenir au moins 3 caractères'
              }
            }}
            secureTextEntry={true}
          />
          <CustomButton
            disabled={isLoading}
            text={isLoading ? "Chargement..." : "Se connecter"}
            onPress={handleSubmit(onSignInPressed)}
            bgColor={SECONDARY_COLOR}
          />
        </View>
      </View>
    </ScrollView>

  )
}


export default SignInScreen
