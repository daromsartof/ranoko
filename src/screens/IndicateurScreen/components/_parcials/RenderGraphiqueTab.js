import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import styles from '../../styles/style'
import CustomInput from '../../../../components/CustomInput/CustomInput'
import PipeChart from '../PipeChart'
import { VerticalBarChart } from '../BarChart'
import { VerticalLineChart } from '../LineChart'
import ButtonGraph from '../ButtonGraph'
import {  Text, Switch } from '@rneui/themed'
import { View } from 'react-native'
import {
    GRAPH_TYPES,
    PERIODE,
    isChecked,
    isNombreDeJours,
    getKeyByValue,
    fetchIndicateurDetails,
    valueFormatter,
    DEFAULT_CONFIG,
    reformatDataComparaison
} from '../../services/indicateur.service'
import { AuthContext } from '../../../../context/AuthContext'
import useColor from '../../../../hooks/useColor'
import RenderLegend from './RenderLegend'
import { cummulHandler } from '../../services/utils'
import { memo } from 'react'
import ContainerWithLoading from '../../../../components/common/ContainerWithLoading'
import DatePicker from '../../../../components/common/DatePicker'
const RenderGraphiqueTab = ({
    data,
    exercices
}) => {
    const [indicateurData, setIndicateurData] = useState({
        barChartData: [],
        lineChartData: {},
        config: {}
    })
    const containerRef = useRef(null)
    const [cumule, setCumule] = useState(false)
    const [graphType, setGraphType] = useState('')
    const [graphTypeOptions, setGraphTypeOptions] = useState([])
    const { userInfo } = useContext(AuthContext)
    const { personnalization } = userInfo
    const { primaryColor } = personnalization
    const defaultColors = useColor()
    const [checked, setChecked] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)


    const onLayout = event => {
        const { width, height } = event.nativeEvent.layout
        containerRef.current = { width, height }
    }

    const periods = [
        {
            label: "Mois",
            value: PERIODE.MONTH
        },
        {
            label: "Sem",
            value: PERIODE.SEM
        },
        {
            label: "Trim",
            value: PERIODE.TRIM
        },
        {
            label: "Ann",
            value: PERIODE.ANN
        }
    ]
    const fetchIndicateur = async (params, config, isComparaison = false, cumule, exercices = []) => {
        setIsLoading(true)
        try {
            const { res, defaultRespone } = await fetchIndicateurDetails(params, exercices)
            if (isComparaison) {
                const comparaisonValue = reformatDataComparaison(defaultRespone.data, defaultColors, exercices)
                setIndicateurData(cumule ? cummulHandler({
                    lineChartData: comparaisonValue.lineChartData,
                    config: comparaisonValue.config
                }, exercices, isComparaison, 12, cumule) : comparaisonValue)
            } else {
                const value = valueFormatter(res, { libelle: data.libelle }, defaultColors, config)
                setIndicateurData(cumule ? cummulHandler({
                    lineChartData: value.lineChartData,
                    config: value.config
                }, exercices, data.isComparaison, 12, cumule) : value)
            }


        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const renderMonthData = (cumule) => {
        return cumule ? cummulHandler(
            {
                barChartData: data.barChartData,
                lineChartData: data.lineChartData,
                config: {
                    ...data.config
                }
            }, exercices, data.isComparaison) : {
            barChartData: data.barChartData,
            lineChartData: data.lineChartData,
            config: {
                ...data.config
            }
        }
    }
   /* const toggleCheckbox = (index) => {
        if (index === checked) return 0
        setChecked(index)
        const key = getKeyByValue(PERIODE, index)
        if (key in data.PERIODE_PARAMS) {
            data.params.periodes = data.PERIODE_PARAMS[key]
            fetchIndicateur(data.params, DEFAULT_CONFIG[index], data.isComparaison, cumule)
        } else if (key === "MONTH") {
            setIsLoading(true)
            setTimeout(() => {
                setIndicateurData(renderMonthData(cumule))
                setIsLoading(false)
            }, 500)
        }
    }*/

    const handleValidateInCalandar = ({active, yearsIndex}) => {
        const key = getKeyByValue(PERIODE, active.value)
        setChecked(active.value)
        if (key in data.PERIODE_PARAMS) {
            const params = {...data.params}
            params.periodes = data.PERIODE_PARAMS[key]
            params.exercices = yearsIndex.map((index, i) => exercices[index])
            fetchIndicateur(params, DEFAULT_CONFIG[active.value], data.isComparaison, cumule, params.exercices)
        } else if (key === "MONTH") {
            setIsLoading(true)
            setTimeout(() => {
                setIndicateurData(renderMonthData(cumule))
                setIsLoading(false)
            }, 500)
        }
        setIsOpen(!isOpen)
    }

    const handleClickGraph = (type_graphe) => {
        setGraphType(type_graphe)
    }

    const showLabelYears = () => {
        return (checked === PERIODE.ANN || graphType !== GRAPH_TYPES.SCIRCLE.name) && !data.isComparaison
    }

    const isDisabledPeriodFilter = (p) => {
        if ((graphType === GRAPH_TYPES.SCIRCLE.name && p.value === PERIODE.MONTH)) {
            return true
        } else if (isNombreDeJours(data.libelle) && p.value === PERIODE.MONTH) {
            return true
        }
        return false
    }

    const handleChangeCummule = (value) => {
        setCumule(value)
        setIndicateurData((indicateurData) => cummulHandler({
                lineChartData: indicateurData.lineChartData,
                config: indicateurData.config
            }, exercices, data.isComparaison, 12, value)
        )
    }

    useEffect(() => {
        setIndicateurData({
            barChartData: data.barChartData,
            lineChartData: data.lineChartData,
            config: {
                ...data.config
            }
        })
        if (Array.isArray(data.type_graphe)) {
            setGraphType(data.type_graphe[0])
            setGraphTypeOptions(data.type_graphe)
        }
        if (isNombreDeJours(data.libelle)) {
            setChecked(PERIODE.ANN)
            setGraphType(data?.type_graphe[1] || data?.type_graphe[0])
        } else {
            setChecked(PERIODE.MONTH)
        }

        return () => {
            setIndicateurData({
                barChartData: [],
                lineChartData: {},
                config: {}
            })
        }

    }, [data])

    
    return (
        <View style={{padding: 5}}>
            <View style={styles.indicateurHead}>
                <View style={[styles.graphTypeContainer, {
                    width: '100%',
                    padding: 5
                }]}>
                     <View style={styles.graphTypeContainer}>
                        <Text style={{ fontSize: 10 }}>Graphe : </Text>
                        {
                            graphTypeOptions.map((type, i) => {
                                if (GRAPH_TYPES.hasOwnProperty(type)) {
                                    return (
                                        <ButtonGraph
                                            key={i}
                                            primaryColor={primaryColor}
                                            active={isChecked(GRAPH_TYPES[type].name, graphType)}
                                            onPress={() => handleClickGraph(GRAPH_TYPES[type].name)}
                                            iconName={GRAPH_TYPES[type].iconName}
                                        />
                                    )
                                }
                            })
                        }
                    </View>
                    <View style={[styles.graphTypeContainer, { marginEnd: 10 }]}>
                        {parseInt(data.cummulable) ? (
                            <>
                              
                                <Switch disabled={checked === PERIODE.ANN} value={cumule} onValueChange={handleChangeCummule} style={{ color: primaryColor }} />
                                <Text style={{ fontSize: 10, paddingLeft: 10 }}>Cumul </Text>
                            </>
                        ) : <></>}
                    </View>
                   

                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: "flex-end", justifyContent: !showLabelYears() ? "flex-end" : "space-between" }}>
                {showLabelYears() && (
                    <View style={{ alignItems: 'flex-end' }}>
                        {exercices.sort().map((exercice, i) => <RenderLegend key={i} label={exercice} color={defaultColors[i]?.frontColor} />)}
                    </View>
                )}
                <View style={{ paddingTop: 13 }}>
                    <View style={{ marginRight:20, flexDirection:"row" }}>
                        {/*periods.map((p, i) => (
                            <View key={i}>
                                <CustomInput
                                    disabled={isDisabledPeriodFilter(p)}
                                    isChecked={isChecked(checked, p.value)}
                                    onChange={() => toggleCheckbox(p.value)}
                                    type={'checkbox'}
                                    primaryColor={primaryColor}
                                    label={p.label}
                                />
                            </View>
                        ))*/
                        <DatePicker 
                            title={"Période"}
                            isMultipleSelection
                            open={isOpen}
                            isRecapCalandar
                            setOpen={setIsOpen}
                            exercices={exercices}
                            isLoading={isLoading}
                            handleValidate={handleValidateInCalandar}
                        />}
                    </View>
                </View>
            </View>
            <View style={styles.indicateurContent} ref={containerRef} onLayout={onLayout}>
                <ContainerWithLoading isLoading={isLoading} loadingContainerStyle={{
                    minHeight: containerRef.current?.height,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {
                        {
                            [GRAPH_TYPES.LINE.name]: (
                                <VerticalLineChart datas={indicateurData?.lineChartData ?? []} config={indicateurData?.config} labels={data?.labels} />
                            ),
                            [GRAPH_TYPES.HISTO.name]: (
                                <VerticalBarChart datas={indicateurData?.barChartData ?? []} config={indicateurData?.config} labels={data?.labels} />
                            ),
                            [GRAPH_TYPES.SCIRCLE.name]: (
                                <PipeChart activePeriod={checked} datas={indicateurData?.lineChartData ?? []} config={indicateurData?.config} primaryColor={primaryColor} />
                            )
                        }[graphType] || (
                            <VerticalBarChart datas={indicateurData.barChartData ?? []} config={indicateurData.config} labels={data.labels} />
                        )
                    }
                </ContainerWithLoading>
                {
                    data?.labels && data.labels.map(({ legend, frontColor }, index) => (
                        <View style={{ paddingTop: 5 }} key={index}>
                            <RenderLegend label={legend} color={frontColor} containerStyles={[
                                {
                                    width: '60%', justifyContent: 'space-between', color: '#000000'
                                }
                            ]} />
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default memo(RenderGraphiqueTab)