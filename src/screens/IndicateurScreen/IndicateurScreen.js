/* eslint-disable no-unused-vars */
import { View, ScrollView, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomSelect from '../../components/CustomSelect'
import axios from 'axios'
import { COMPTA_GESTION_URL, DOSSIERS_URL, imageAssets, INDICATEURS_URL } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './styles/style'
import CardIndicateur from './components/CardIndicateur'
import {
  divideIntoYears,
  getPeriodParams,
  isNombreDeJours,
  reformatDataComparaison,
  valueFormatter
} from './services/indicateur.service'
import useColor from '../../hooks/useColor'


const IndicateurScreen = () => {
  const { userInfo } = useContext(AuthContext)
  const { personnalization } = userInfo
  const { primaryColor } = personnalization
  const defaultColors = useColor()
  const [userDossiers, setUserDossiers] = useState([])
  const [loadingDossier, setLoadingDossier] = useState(false)
  const [selectedDossier, setSelectedDossier] = useState({})
  const [indicateurParams, setIndicateurParams] = useState({
    exercices: [],
    indicateurs: []
  })
  const [indicateurDatas, setIndicateurDatas] = useState([])
  const [indicateurNombreDeJours, setIndicateurNombreDeJours] = useState({})

  const fetchIndicateurParams = async (token, dossier) => {
    try {
      setLoadingDossier(true)

      const response = await axios.get(`${INDICATEURS_URL}/${dossier}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        }
      })
      setIndicateurParams(response.data.params)
    } catch (err) {
      console.error('AXIOS ERROR: ', err)
    }

    setLoadingDossier(false)
  }

  const fetchIndicateurDatas = async () => {

    const dataTmps = []
    if (indicateurParams.indicateurs.length > 0) {

      const { periodes, moiss, exercices, dossier, indicateurs } =
        indicateurParams
      const postData = {
        dossier, indicateur: '', analyse: 1, exercices, moiss,
        periodes,
        is_etat: 0,
        cumule: 0
      }
      setLoadingDossier(true)
      for (const ind of indicateurs) {
        const PERIODE_PARAMS = getPeriodParams(moiss)
        try {
          postData.indicateur = ind.indicateur
          if (isNombreDeJours(ind.libelle)) {
            postData.periodes = PERIODE_PARAMS.ANN
          }
          const response = await axios
            .post(
              COMPTA_GESTION_URL,
              JSON.stringify(postData),
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            )
          const res = response.data
          res.value = {}

          exercices.map(e => {
            res.value[e] = res.datas.find(({ name }) => name === e)
          })
          if (isNombreDeJours(ind.libelle)) {
            dataTmps.push({
              libelle: ind.libelle,
              description: ind.description,
              type_graphe: ind.type_graphe,
              PERIODE_PARAMS,
              params: {
                ...postData
              },
              ...divideIntoYears(res.value, defaultColors, ind.libelle)
            })
            postData.periodes = periodes
          } else if (ind.isComparaison) {
            dataTmps.push({
              ...reformatDataComparaison(response.data, defaultColors, exercices),
              PERIODE_PARAMS,
              ...ind,
              params: {
                ...postData
              }
            })
          } else {
            dataTmps.push({
              ...valueFormatter(res, ind, defaultColors),
              PERIODE_PARAMS,
              params: {
                ...postData
              }
            })
          }


        } catch (err) {
          console.error('AXIOS ERROR: ', err)
        } 
      }
      setIndicateurDatas(dataTmps)
      setLoadingDossier(false)
    }

  }

  useEffect(() => {
    const { dossiers } = userInfo
    setUserDossiers(dossiers)
  }, [userInfo.dossiers])


  useEffect(() => {
    if (indicateurParams) {
      fetchIndicateurDatas()
    }
  }, [indicateurParams])


  const onChangeDossier = item => {
    setSelectedDossier(item)
    const { token } = userInfo
    if (item?.value) {
      fetchIndicateurParams(token, item.value)
    }
   
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Spinner visible={loadingDossier} />
      <View>
        <View style={styles.filtre}>
          <CustomSelect
            selectedItem={selectedDossier}
            items={userDossiers.map(d => {
              return {
                value: d.idDossier,
                label: d.name
              }
            })}
            onChange={onChangeDossier}
            label="Dossier"
            borderBottomColor={primaryColor}
            placeholder={`Choisir le dossier:`}
          />
        </View>
        {
          !selectedDossier.value ? (
            <View style={{ flex: 1, width:"100%", height:"100%" }}>
              <View style={{paddingVertical:10, alignItems:"center"}}>
                <Image source={imageAssets.tableauDeBord} style={{ width: 180}}  />
              </View>
              <View style={{paddingVertical:10, alignItems:"center"}}>
                <Image source={imageAssets.tableauDeBord2} />
              </View>
              <View style={{paddingVertical:10, alignItems:"center"}}>
                <Image source={imageAssets.tableauDeBord3}  />
              </View>
              <View style={{paddingVertical:10,alignItems:"center"}}>
                <Image source={imageAssets.tableauDeBord4}  />
              </View>
            </View>
          ) : (
            <>
              {indicateurDatas.map((indicateurD, key) => {
                  return (
                    <CardIndicateur
                      indicateurNombreDeJours={indicateurNombreDeJours}
                      key={key}
                      selectedDossier={selectedDossier}
                      exercices={indicateurParams.exercices}
                      data={indicateurD}
                    />
                  )
              })}
            </>
          )
        }
        
      </View>
    </ScrollView>
  )
}

export default IndicateurScreen
