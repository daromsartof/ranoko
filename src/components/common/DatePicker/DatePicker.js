import React, { useContext, useState } from 'react'
import { View, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native'

import { AuthContext } from '../../../context/AuthContext'
import { Button, ButtonGroup,Tooltip, Text } from '@rneui/themed'
import useColor from '../../../hooks/useColor'
import { CALANDAR_CONFIG } from '../../../config'
import { PERIODE } from '../../../screens/IndicateurScreen/services/indicateur.service'

const CELL = {
    _WIDTH: 50,
    _HEIGHT: 170,
    _BORDER_COLOR: "#d7d6d6c4",
    _BORDER_WIDTH: 1
}
const Cellule = ({
    fields = [],
    active,
    isMultipleSelection,
    setActive,
}) => {
    const [primaryColor] = useColor(true)
    const isActive = (active, field) => isMultipleSelection ? active.find(act =>  act?.value === field.value) : active?.value === field.value
    const handleClickCell = (item) => {
        setActive({
            item,
            selected: !isActive(active, item)
        })
    }


    return (
        <>
            {fields.map((field, i) => (
                <TouchableHighlight
                    key={i}
                    onPress={() => handleClickCell(field)}
                    style={{
                        flex: (1 / fields.length),
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isActive(active, field) ? primaryColor.frontColor : "transparent",
                        borderWidth: CELL._BORDER_WIDTH,
                        borderColor: CELL._BORDER_COLOR,
                    }}
                >
                    <Text style={{
                        color: isActive(active, field) ? "white" : "black",
                        textAlign: "center"
                    }}>{field.label}</Text>
                </TouchableHighlight>
            ))}
        </>
    )
}

const DatePickerModal = ({
    validateAction,
    years = [],
    isLoading = true,
    selectedIndex,
    isMultipleSelection,
    isRecapCalandar,
    setSelectedIndex,
    setCellActiveId,
    multipleExercice,
    calandarStructure,
    cellActiveId,
    active,
    setActive
}) => {
    const { userInfo } = useContext(AuthContext)
    const { personnalization } = userInfo
    const { primaryColor } = personnalization
    const [error, setError] = useState(false)
    const handleClick = () => {
        if (!active) {
            setError(true)
            return 0
        }
        validateAction({yearsIndex: selectedIndex,active: active})
    }

    const handleClickCell = (value, cellId) => {
        setError(false)
        if (value.selected) {
            setActive(act => {
                if (isMultipleSelection) {
                    return cellId === cellActiveId ? [...act, value.item] : [value.item]
                } else {
                    return value.item
                }
            })
        } else {
            setActive(act => {
                if (isMultipleSelection) {
                    return act.filter(a => a?.value !== value.item.value)
                } else {
                    return value.item
                }
            })
        }
        setCellActiveId(cellId)
    }

    return (

        <View style={{
            flex: 1,
        }}>
            <View>
                <Text>
                    Exercice
                </Text>
               <ButtonGroup
                    containerStyle={{
                        padding: 0,
                        margin: 0
                    }}
                    selectMultiple={multipleExercice}
                    buttonStyle={{ padding: 0 }}
                    selectedButtonStyle={{ backgroundColor: primaryColor }}
                    buttons={years}
                    disabled={multipleExercice}
                    selectedIndexes={multipleExercice ? selectedIndex : undefined}
                    selectedIndex={!multipleExercice ? selectedIndex : undefined}
                    onPress={setSelectedIndex}
                />
            </View>
            <View style={{
                marginTop: 10
            }}>
                <Text>Période</Text>
                <View style={[{
                    flexDirection: "row",
                    marginTop: 10,
             
                }, error ? {
                    borderColor: "red",
                    borderWidth: 1
                } : {}]}>
                    <View style={[styles.row, {
                        width:  isRecapCalandar ? 70 : CELL._WIDTH
                    }]}>
                        <Cellule fields={[
                            {
                                label: isRecapCalandar ? "ANN" : "A",
                                value: isRecapCalandar ? PERIODE.ANN : CALANDAR_CONFIG.YEARS
                            }
                        ]}
                            active={active}
                            isMultipleSelection={isMultipleSelection}
                            setActive={(props) => handleClickCell(props, PERIODE.ANN)}
                        />
                    </View>
                    {
                        isRecapCalandar ? (
                            <>
                                <View style={[styles.row, {width: 80}]}>
                                    <Cellule fields={[
                                        {
                                            label: "SEM",
                                            value: PERIODE.SEM
                                        }
                                    ]}
                                        active={active}
                                        isMultipleSelection={isMultipleSelection}
                                        setActive={(props) => handleClickCell(props, PERIODE.ANN)}
                                    />
                                </View>
                                <View style={[styles.row, {width: 80}]}>
                                    <Cellule fields={[
                                        {
                                            label: "TRIM",
                                            value: PERIODE.TRIM
                                        }
                                    ]}
                                        active={active}
                                        isMultipleSelection={isMultipleSelection}
                                        setActive={(props) => handleClickCell(props, PERIODE.ANN)}
                                    />
                                </View>
                                <View style={[styles.row, {width: 60}]}>
                                    <Cellule fields={[
                                        {
                                            label: "MOIS",
                                            value: PERIODE.MONTH
                                        }
                                    ]}
                                        active={active}
                                        isMultipleSelection={isMultipleSelection}
                                        setActive={(props) => handleClickCell(props, PERIODE.ANN)}
                                    />
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.row}>
                                    <Cellule fields={[
                                        {
                                            label: "S1",
                                            value: CALANDAR_CONFIG.SEMESTRE.SEMESTRE_1
                                        },
                                        {
                                            label: "S2",
                                            value: CALANDAR_CONFIG.SEMESTRE.SEMESTRE_2
                                        }
                                    ]}
                                        active={active}
                                        isMultipleSelection={isMultipleSelection}
                                        setActive={(props) => handleClickCell(props, PERIODE.SEM)}
                                    />
                                </View>
                                
                                <View style={styles.row}>
                                    <Cellule fields={[
                                        {
                                            label: "T1",
                                            value: CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_1
                                        },
                                        {
                                            label: "T2",
                                            value: CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_2
                                        },
                                        {
                                            label: "T3",
                                            value: CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_3
                                        },
                                        {
                                            label: "T4",
                                            value: CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_4
                                        }
                                    ]}
                                        active={active}
                                        isMultipleSelection={isMultipleSelection}
                                        setActive={(props) => handleClickCell(props, PERIODE.TRIM)}
                                    />
                                </View>
                                {calandarStructure.chunk(4).map((cal, i) => (
                                    <View style={styles.row} key={i}>
                                        <Cellule fields={[
                                            {
                                                label: calandarStructure[i]?.libelle || CALANDAR_CONFIG.MONTH[calandarStructure[i]],
                                                value:  parseInt(calandarStructure[i]?.moiss ? calandarStructure[i].moiss[0] : calandarStructure[i])
                                            },
                                            {
                                                label: calandarStructure[i+3]?.libelle || CALANDAR_CONFIG.MONTH[calandarStructure[i+3]],
                                                value: parseInt(calandarStructure[i+3]?.moiss ? calandarStructure[i+3]?.moiss[0] :  calandarStructure[i+3])
                                            },
                                            {
                                                label: calandarStructure[i+6]?.libelle || CALANDAR_CONFIG.MONTH[calandarStructure[i+6]],
                                                value:  parseInt(calandarStructure[i+6]?.moiss ? calandarStructure[i+6]?.moiss[0] : calandarStructure[i+6])
                                            },
                                            {
                                                label: calandarStructure[i+9]?.libelle || CALANDAR_CONFIG.MONTH[calandarStructure[i+9]],
                                                value: parseInt(calandarStructure[i+9]?.moiss ? calandarStructure[i+9]?.moiss[0] :  calandarStructure[i+9])
                                            }
                                        ]}
                                            active={active}
                                            isMultipleSelection={isMultipleSelection}
                                            setActive={(props) => handleClickCell(props, PERIODE.MONTH)}
                                        />
                                    </View>
                                ))}
                            </>
                        )
                    }
                </View>

                    </View> 
            <View style={{
                marginTop: 10,
                alignItems: "flex-end"
            }}>
                <Button size='sm' containerStyle={{
                    width: "50%",
                }} buttonStyle={{
                    backgroundColor: primaryColor
                }}
                    onPress={handleClick}
                >{isLoading ? <ActivityIndicator /> : "Valider"}</Button>
            </View>
        </View>
    )
}

const DatePickerCalandar = ({
    title,
    open, 
    setOpen,
    isMultipleSelection,
    calandarStructure,
    isRecapCalandar,
    exercices,
    isLoading,
    handleValidate
}) => {
    const indexActive = exercices.findIndex((year) => year === new Date().getFullYear() - 1)
    const [selectedIndex, setSelectedIndex] = useState(isMultipleSelection ? exercices.map((e, i) => i) : indexActive)
    const [active, setActive] = useState(isMultipleSelection ? [] : null)
    const [cellActiveId, setCellActiveId] = useState(null)
    return (
        <Tooltip
            visible={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            containerStyle={{
                borderColor: "#d7d6d6c4",
                borderWidth: 1,
                height: 360

            }}
            width={(CELL._WIDTH * 6) + 10}
            backgroundColor="#fff"
            popover={<DatePickerModal 
                calandarStructure={calandarStructure}
                years={exercices} 
                multipleExercice={isMultipleSelection}
                isRecapCalandar={isRecapCalandar}
                isLoading={isLoading} 
                validateAction={handleValidate} 
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                active={active}
                setActive={setActive}
                setCellActiveId={setCellActiveId}
                cellActiveId={cellActiveId}
            />}
        >
            <View style={{
                borderBottomWidth: 2,
                borderBottomColor: "#d7d6d6c4",
                paddingBottom: 5
            }}>
                <Text >{title}</Text>
            </View>
        </Tooltip>
    )
}


const styles = StyleSheet.create({
    textCenter: {
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        width: CELL._WIDTH * 6,
     //   height: 300,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    years: {
        borderWidth: CELL._BORDER_WIDTH,
        borderColor: CELL._BORDER_COLOR,
        width: CELL._WIDTH,
        height: CELL._HEIGHT,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        width: CELL._WIDTH,
        height: CELL._HEIGHT,
    },
})

export default DatePickerCalandar