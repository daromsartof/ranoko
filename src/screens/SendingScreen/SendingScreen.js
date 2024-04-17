import React, { useState, useEffect, useContext } from 'react'
import {  View, SafeAreaView } from 'react-native'
import CustomSelect from '../../components/CustomSelect'

import axios from 'axios'
import { CATEGORIES_URL, UPLOAD_URL } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import CustomButton from '../../components/CustomButton'
import Spinner from 'react-native-loading-spinner-overlay'
import { useToast } from 'react-native-toast-notifications'
import { ActivityIndicator } from 'react-native-paper'
import styles from './styles/style'
import ModalMessage from '../../components/common/modal/ModalMessage'
import { generateYearArray } from '../../components/common/services/service'

const currentYear = new Date().getFullYear()
const exercices = generateYearArray()
function SendingScreen({ navigation }) {
  const { userInfo } = useContext(AuthContext)
  
  const [selectedDossier, setSelectedDossier] = useState({})
  const [selectedCategorie, setSelectedCategorie] = useState({})
  const [selectedExercice, setSelectedExercice] = useState({
    value: currentYear,
    label: currentYear.toString()
  })
  const [userDossiers, setUserDossiers] = useState([])
  const [categories, setCategories] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)

  const { primaryColor } = userInfo.personnalization
  const [loading, setLoading] = useState(false)
  const [cancelTokenSource, setCancelTokenSource] = useState(null)
  const [modalVisible, setModalVisible] = useState({
    isVisible: false,
    message: '',
    status: 'success'
  })
  const toast = useToast()

  const sendImage = async () => {
    const navigationState = navigation.getState()
    const { routes } = navigationState
    const { params } = routes.find(r => r.name === 'Sending')

    if (selectedDossier.value && selectedCategorie.value) {
      const data = {
        idDossier: selectedDossier.value,
        idCategory: selectedCategorie.value,
        fileContent: params.image,
        exercice: selectedExercice.value.toString()
      }
      const source = axios.CancelToken.source()
      setCancelTokenSource(source)

      setLoading(true)
      try {
        setTimeout(() => {
          setIsDisabled(false)
        }, 1500);
        await axios.post(UPLOAD_URL, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': userInfo.token
          },
          cancelToken: source.token
        })
        setLoading(false)

        setModalVisible({
          isVisible: true,
          status: 'success',
          message: `Votre pièce à bien été classée dans votre dossier ${selectedDossier.label}`
        })
        setTimeout(() => {
          setModalVisible({
            ...modalVisible,
            isVisible: false
          })
          navigation.goBack()
        }, 6000)
      } catch (e) {
        setLoading(false)
        if (axios.isCancel(e)) {
          console.log('Request canceled', e.message)
        } else {
          console.error(e);
          setModalVisible({
            isVisible: true,
            status: 'danger',
            message: "Il y a une erreur, merci de recommencer"
          })
          setTimeout(() => {
            setModalVisible({
              ...modalVisible,
              isVisible: false
            })
          }, 6000)
        }
      }
    } else {
      toast.show('Veuillez choisir le dossier et la catégorie', {
        type: 'danger',
        placement: 'top',
        animationType: 'zoom-in'
      })
    }
  }

  const cancelRequest = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Operation canceled by the user.')
    }
  }

  const fetchCategories = async token => {
    try {
      const response = await axios.get(CATEGORIES_URL, {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        }
      })
      setCategories(
        response.data.data.map(c => {
          return {
            value: c.idCategory,
            label: c.name
          }
        })
      )
    } catch (err) {
      console.log('AXIOS ERROR: ', err)
    }
  }

  useEffect(() => {
    const { token, dossiers } = userInfo
    if (dossiers.length === 1) {
      const dossierTmp = dossiers[0]
      setSelectedDossier({
        item: dossierTmp.name,
        id: dossierTmp.idDossier
      })
    }

    setUserDossiers(dossiers)
    fetchCategories(token)
  }, [userInfo])

  useEffect(() => {
    if (userDossiers.length === 1) {
      const { idDossier, name } = userDossiers[0]
      setSelectedDossier({
        value: idDossier,
        label: name
      })
    }
  }, [userDossiers])


  const onChangeDossier = value => {
    setSelectedDossier(value)
  }

  const onChangeCategorie = value => {
    setSelectedCategorie(value)
  }

  const onChangeExercice = value => {
    setSelectedExercice(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" animating={loading} />
        </View>

        <View>
          <CustomButton text="Annuler" bgColor={"#d37a38"} disabled={isDisabled} onPress={cancelRequest}>
            {' '}
          </CustomButton>
        </View>
      </Spinner>
      <View style={styles.body}>
          <CustomSelect
            withLabel
            selectedItem={selectedDossier}
            items={userDossiers.map(d => ({
              value: d.idDossier,
              label: d.name
            }))}
            onChange={onChangeDossier}
            label="Dossier"
            borderBottomColor={primaryColor}
            placeholder={`Choisir le dossier:`}
          />
          <CustomSelect
            withLabel
            selectedItem={selectedExercice}
            items={exercices}
            onChange={onChangeExercice}
            label="Exercice Comptable "
            borderBottomColor={primaryColor}
            placeholder={`Choisir l'exercice comptable:`}
          />
          <CustomSelect
            withLabel
            selectedItem={selectedCategorie}
            items={categories}
            onChange={onChangeCategorie}
            label="Catégorie"
            borderBottomColor={primaryColor}
            placeholder={`Choisir la catégorie:`}
          />
      </View>
      <ModalMessage
        modalVisible={modalVisible.isVisible}
        status={modalVisible.status}
        message={modalVisible.message}
        setModalVisible={() => setModalVisible(t => ({
          ...t,
          isVisible: !t.isVisible
        }))}
      />
      <View style={styles.footer}>
        <CustomButton text="Envoyer" bgColor={primaryColor} onPress={sendImage}>
          {' '}
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}

export default SendingScreen
