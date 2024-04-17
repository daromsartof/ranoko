import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text as TextNative, Pressable, ActivityIndicator } from 'react-native'
import useColor from '../../../../hooks/useColor'
import { Switch, Text, Tooltip } from '@rneui/themed'
import { CALANDAR_CONFIG } from '../../../../config'
import { amountFormatter, calculePourcentage, fetchIndicateurDetails, getLastMaj, getParamsLastAndNext, getPeriodParamsFromCalandarFilter, isNegativeInString, isNombreDeJours } from '../../services/indicateur.service'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DatePickerCalandar from '../../../../components/common/DatePicker'
import { calculateCumulativeSum } from '../../services/utils'
import RenderTitelNombre from './RenderTitelNombre'
import ContainerWithLoading from '../../../../components/common/ContainerWithLoading'
import { memo } from 'react'
import { IndicateurContext } from '../CardIndicateur'
import { AuthContext } from '../../../../context/AuthContext'

const getValuePourCente = (response, current, nombreDeJours) => {
    return response.res?.datas.length > 0 ? response.res.datas.map((it, i) => {
        const val = calculateCumulativeSum(it.data).at(-1).value
        return {
            pourCent: amountFormatter(calculePourcentage(
                calculateCumulativeSum(current.datas[i].data).at(-1).value,
                val,
                nombreDeJours
            ), 0, true),
            val,
            unite: response.res.unite
        }
    }) : [{
        pourCent: "0",
        val: "0"
    }]
}

const getValuePourCenteNotComparaison = (response, current, exercice, nombreDeJours) => {
    const val = calculateCumulativeSum(response.res.datas[0].data).at(-1).value
    return response.res?.datas.length > 0 ? [{
        pourCent: amountFormatter(calculePourcentage(
            calculateCumulativeSum(current.value[exercice].data).at(-1).value,
            val,
            nombreDeJours
        ), 0, true),
        val,
        unite: response.res.unite
    }] : [{
        pourCent: "0",
        val: "0"
    }]
}


const RenderLastAndLastValue = ({
    indecateur,
    isLoading,
    isNombreDeJourse = false, 
    index,
    size = 15
}) => {
    const [primaryColor] = useColor(true)
    return (
        <ContainerWithLoading isLoading={isLoading} >
            <Text style={[styles.secondaryText, {
                color: primaryColor.frontColor,
                fontSize: size
            }]} >
                
                <TextNative style={{
                    color: ((isNegativeInString(indecateur.value[index]?.pourCent) && !isNombreDeJourse) || (isNombreDeJourse && !isNegativeInString(indecateur.value[index]?.pourCent)))  ? "red" : "green"
                }}>
                 
                    {
                        isNegativeInString(indecateur.value[index]?.pourCent) ? (
                            <AntDesign name="caretdown" size={size} />
                        ) : (
                            <AntDesign name="caretup" size={size} />
                        )
                    } {" " + indecateur.value[index]?.pourCent?.replace(/-/, '').length > 0 ? indecateur.value[index]?.pourCent?.replace(/-/, '') : "0"}%</TextNative>
                {" / "}
                <TextNative>{indecateur.name}</TextNative> 
                <TextNative> | </TextNative>  
                <TextNative style={{
                    color: parseInt(indecateur.value[index]?.val) < 0 ? "red" : primaryColor
                }} >{amountFormatter(indecateur.value[index]?.val, 0)?.replace(/-/, '')}</TextNative>
                <TextNative> {indecateur.value[index]?.unite} 
            </TextNative>
            </Text>
        </ContainerWithLoading>
    )
}
const RenderNombreTab = ({
    exercices,
    data
}) => {
    const [primaryColor] = useColor(true)
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [indecateurLastAndNext, setIndecateurLastAndNext] = useState({
        isLoading: false,
        last: {
            value: [{
                pourCent: "0",
                val: "0"
            }]
        },
        next: {
            value: [{
                pourCent: "0",
                val: "0"
            }]
        }
    })
    const [indicateur, setIndicateur] = useState({
        unite: "€",
        value: {},
        datas: []
    })
    const [isCummule, setIsCummule] = useState(false)
    const { filter, setFilter,selectedDossier } = useContext(IndicateurContext)
    const { userInfo } = useContext(AuthContext)

    const fetchDetailIndicateur = async (params, exercices) => {
        try {
            setIsLoading(true)
            params.cumule = isCummule ? 1 : 0
            const { defaultRespone } = await fetchIndicateurDetails(params, exercices)
            setIndicateur(defaultRespone.data)
            setIsLoading(false)
            return defaultRespone.data
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }
    const fecthLastAndNextIndicator = async (params, activeExercice, currentValue, activeCalandar, isCummule) => {
        try {
            const lastParams = { ...params }
            const nextParams = { ...params }
            const lastAndNext = getParamsLastAndNext(data.PERIODE_PARAMS, activeExercice, activeCalandar, isCummule)
            lastParams.exercices = lastAndNext.last.exercices
            nextParams.exercices = lastAndNext.next.exercices
            nextParams.periodes = lastAndNext.next.periodes || nextParams.periodes
            lastParams.periodes = lastAndNext.last.periodes || lastParams.periodes
            setIndecateurLastAndNext((last) => ({
                ...last,
                isLoading: true,
            }))
            const responseLast = await fetchIndicateurDetails(lastParams, lastParams.exercices)
            const responseNext = await fetchIndicateurDetails(nextParams, nextParams.exercices)
            const nombreDeJours = isNombreDeJours(data.libelle)
            const js = {
                isLoading: false,
                last: {
                    name: lastAndNext.last.label
                },
                next: {
                    name: lastAndNext.next.label
                }
            }
            if (data.isComparaison) {
                js.last.value = getValuePourCente(responseLast, currentValue, nombreDeJours)
                js.next.value = getValuePourCente(responseNext, currentValue, nombreDeJours)
            } else {
                js.last.value = getValuePourCenteNotComparaison(responseLast, currentValue, activeExercice, nombreDeJours)
                js.next.value = getValuePourCenteNotComparaison(responseNext, currentValue, activeExercice, nombreDeJours)
            }
            setIndecateurLastAndNext(js)

        } catch (error) {
            console.error(error)
            setIndecateurLastAndNext((ind) => ({
                ...ind,
                isLoading: false
            }))
        }
    }

    const checkLastMaj = async (params) => {
        const { data } = await getLastMaj(params.dossier, params.exercices[0], userInfo.token)

        if (data.date_verification) {
            const dateVerif = new Date(data.date_verification)
            const refDate = new Date(dateVerif.getTime())
            refDate.setDate(27)
            return {
                dateVerif,
                isOk: dateVerif > refDate
            }
        }
        return {
            isOk: false
        }
    }

    const isCurrentYear = (params, active) => params.exercices[0] === new Date().getFullYear() && active.value === CALANDAR_CONFIG.YEARS

    const handleValidate = async ({ active, yearsIndex }, isCummule) => {
        const params = { ...data.params }
        params.exercices = [exercices[yearsIndex] ?? new Date().getFullYear()]

        
        const activeParams =  {...active}
        try {
           if (isCurrentYear(params, active) && !isNombreDeJours(data.libelle)) {
                const { dateVerif, isOk }  = await checkLastMaj(params)
                if (isOk) {
                    activeParams.value = dateVerif.getMonth() + 1
                } else {
                    activeParams.value = dateVerif ? dateVerif.getMonth() : active.value
                }
            }
        } catch (error) {
            activeParams.value = isCurrentYear() ? new Date().getMonth() + 1 : active.value
        }
        params.periodes = getPeriodParamsFromCalandarFilter(data.PERIODE_PARAMS, activeParams, params.exercices[0], isCummule || isCurrentYear(params, active))
        const res = await fetchDetailIndicateur(params, params.exercices)
        setOpen(false)
        setFilter({ active, yearsIndex })
        fecthLastAndNextIndicator(params, exercices[yearsIndex], res, activeParams, isCummule || isCurrentYear(params, active))
    }

    const handleChangeCummule = () => {
        setIsCummule(!isCummule)
        handleValidate(filter, !isCummule)
    }

    const initialFetchData = async () => {
        const params = { ...data.params }
        const activeParams =  {...filter.active}
        params.exercices = [exercices[filter.yearsIndex]]
        if (isCurrentYear(params, filter.active) && !isNombreDeJours(data.libelle)) {
            const { dateVerif, isOk }  = await checkLastMaj(params)
            if (isOk) {
                activeParams.value = dateVerif.getMonth() + 1
            } else {
                activeParams.value = dateVerif ? dateVerif.getMonth() : activeParams.value
            }
        }
        params.periodes = getPeriodParamsFromCalandarFilter(data.PERIODE_PARAMS, activeParams, exercices[filter.yearsIndex], isCummule)
        fetchDetailIndicateur(params, params.exercices).then((res) => {
            params.exercices.map((exercice, index) => {
                fecthLastAndNextIndicator(params, exercice, res, activeParams, isCummule)
            })
        })
    }

    useEffect(() => {
        initialFetchData()
    }, [selectedDossier])

    return (
        <View style={styles.container}>

            <View style={[styles.containerViewStat, {
                borderColor: primaryColor.frontColor,
            }]}>
                <View style={styles.filterContainer}>

                    <DatePickerCalandar
                        title={"Période"}
                        open={open}
                        calandarStructure={isNombreDeJours(data.libelle) ? data.params.periodes[0]?.moiss : data.params.periodes }
                        setOpen={setOpen}
                        handleValidate={(res) => handleValidate(res, isCummule)}
                        isLoading={isLoading}
                        exercices={exercices}
                    />
                    {
                       parseInt(data.cummulable) ? (
                            <View style={styles.rowCenter}>
                                <Switch value={isCummule} onValueChange={handleChangeCummule} style={{ color: primaryColor }} />
                                <Text style={{ fontSize: 10, paddingLeft: 10 }}>Cumul</Text>
                            </View>
                        ) : <></>
                    }
                    
                </View>
                <ContainerWithLoading
                    loadingContainerStyle={{
                        minHeight: 200,
                        justifyContent: 'center',
                    }}
                    isLoading={isLoading}
                >
                    {indicateur.datas.map((it, index) => (
                        <View key={index}>
                            <RenderTitelNombre
                                indicateur={indicateur}
                                filter={filter}
                                item={it}
                                description={data.description}
                                isComparaison={data.isComparaison}
                                isCummule={isCummule}
                            />
                            <View style={{ marginVertical: 20 }}>
                                <Text style={[styles.primaryText, {
                                    color: primaryColor.frontColor
                                }]}>{(Array.isArray(it.data) && it.data.length > 0) ? amountFormatter(
                                    isNombreDeJours(data.libelle) ? Math.abs(calculateCumulativeSum(it.data).at(-1).value) : calculateCumulativeSum(it.data).at(-1).value
                                    , 0, true) : "0"} {indicateur.unite}</Text>
                                <RenderLastAndLastValue
                                    isLoading={indecateurLastAndNext.isLoading}
                                    indecateur={indecateurLastAndNext.last}
                                    index={index}
                                    isNombreDeJourse={isNombreDeJours(data.libelle)}
                                    size={21}
                                />
                                <RenderLastAndLastValue
                                    isLoading={indecateurLastAndNext.isLoading}
                                    indecateur={indecateurLastAndNext.next}
                                    isNombreDeJourse={isNombreDeJours(data.libelle)}
                                    index={index}
                                />

                            </View>
                        </View>
                    ))}
                </ContainerWithLoading>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerViewStat: {
        padding: 20,
        paddingTop: 10
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        textAlign: 'center',
    },
    primaryText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 35
    },
    secondaryText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 15,
    },
})

export default memo(RenderNombreTab)