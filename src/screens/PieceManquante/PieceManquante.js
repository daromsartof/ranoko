import React, { useContext, useState } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { Card, Skeleton, Text, ListItew, ListItem } from '@rneui/themed'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { NEXT_TACHE } from '../../config'
import CustomSelect from '../../components/CustomSelect'
import Spinner from 'react-native-loading-spinner-overlay'
import { calculExercice, getNotifications } from './services/PieceManquante.service'
import LinearGradient from 'react-native-linear-gradient'
import ContainerBackground from '../../components/ContainerBackground'


const now = new Date()
const PieceManquante = () => {
    const { userInfo } = useContext(AuthContext)
    const { token } = userInfo
    const [selectedDossier, setSelectedDossier] = useState({})
    const [isLoading, setIsLoading] = useState({
        first: false,
        seconde: false
    })
    const [nextTaches, setNextTaches] = useState(null)
    const [notifications, setNotifications] = useState([])
    const getNextTache = async (dossier_id) => {
        setIsLoading((l) => ({
            ...l,
            first: true
        }))
        setNextTaches(null)
        try {
            const res = await axios
                .get(NEXT_TACHE.replace('{dossier_id}', dossier_id), {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': token
                    }
                })
            const { contents } = res.data
            if (contents.length > 0) {
                const exercice = calculExercice(contents)
                setIsLoading(() => ({
                    seconde: true,
                    first: false
                }))
                setNextTaches(contents)
              /*  setNotifications(await getNotifications(token, dossier_id, exercice))
                setIsLoading((l) => ({
                    ...l,
                    seconde: false
                }))*/
            } else {
                setIsLoading(() => ({
                    seconde: false,
                    first: false
                }))
            }


        } catch (error) {
            console.error("axio ", error.message)
        }
    }
    const onChangeDossier = (item) => {
        setSelectedDossier(item)
        getNextTache(item.value)
    }

    return (

        <ScrollView style={{ flex: 1 }}>
            <ContainerBackground>
                <Spinner visible={false} />
                <View style={{
                    flex: 1,
                    height: "100%",
                }}>
                    <View>
                        <View >
                            <CustomSelect
                                selectedItem={selectedDossier}
                                items={userInfo.dossiers?.map(d => ({
                                    value: d.idDossier,
                                    label: d.name
                                }))}
                                onChange={onChangeDossier}
                                placeholder={`Choisir le dossier:`}
                            />
                        </View>
                    </View>
                    <Card containerStyle={{
                        margin: 5,
                        marginBottom: 30,
                        backgroundColor: "#ffffffb0"
                    }}>
                        <Card.Title >VOS ECHEANCES FISCALES</Card.Title>
                        <Card.Divider />
                        <View style={{ minHeight: 200, justifyContent: 'flex-end' }}>
                            <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 24 }}>
                                Votre prochaine échéance fiscale :
                            </Text>
                            {nextTaches === null ? (
                                <View style={{
                                    borderColor: userInfo.personnalization?.primaryColor ?? '#000000',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    backgroundColor: userInfo.personnalization?.primaryColor ?? 'transparent',
                                    marginTop: 15
                                }}>

                                    {isLoading.first ? (
                                        <Skeleton
                                            LinearGradientComponent={LinearGradient}
                                            animation="wave"
                                            style={{
                                                backgroundColor: userInfo.personnalization?.primaryColor
                                            }}
                                            width={"100%"}
                                            height={50}
                                        />
                                    ) : (
                                        <Text style={{
                                            padding: 10,
                                            fontSize: 18,
                                            textAlign: 'center',
                                            color: userInfo.personnalization?.primaryColor ? '#fff' : '#000000'
                                        }}>
                                            Pour voir l'échéance, veuillez sélectionner un dossier.
                                        </Text>
                                    )}
                                </View>
                            ) : (
                                <View>
                                    {nextTaches.map((nextTache, i) => (
                                        <View key={i} >
                                            <View style={{
                                                borderColor: userInfo.personnalization?.primaryColor ?? '#000000',
                                                borderWidth: 1,
                                                borderRadius: 3,
                                                backgroundColor: userInfo.personnalization?.primaryColor ?? 'transparent',
                                                marginTop: 15
                                            }}>
                                                <Text style={{
                                                    padding: 10,
                                                    fontSize: 18,
                                                    textAlign: 'center',
                                                    color: userInfo.personnalization?.primaryColor ? '#fff' : '#000000'
                                                }}>
                                                    Votre {nextTache?.nom_tache} au {new Date(nextTache?.date_tache).formatFrenchLong()}
                                                </Text>
                                            </View>
                                            {
                                                nextTache.flag === 1 && (
                                                    <View>
                                                        {nextTache?.date_tache && (
                                                            <Text>
                                                                Merci de nous envoyer vos pièces avant le
                                                                <Text>
                                                                    {` ${new Date(nextTache?.date_tache).getNDate(-8).formatFrenchLong()}`}
                                                                </Text>
                                                            </Text>
                                                        )}
                                                    </View>
                                                )
                                            }

                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </Card>
                    {/*<Card containerStyle={{
                    margin: 0,
                    flex: 1,
                    backgroundColor: "#ffffffb0",
                    minHeight: 300
                }}>
                    {isLoading.seconde ? (
                        <View style={{
                            minHeight: 200,
                            justifyContent: 'center'
                        }}>
                            <ActivityIndicator size="large" color={userInfo.personnalization?.primaryColor} />
                        </View>
                    ) : (
                        <>
                            {(nextTache?.date_tache && (now.areSameDayTo(new Date(nextTache?.date_tache).getNDate(-8)) ||
                                (now.isWeAreGreatInSameDay(new Date(nextTache?.date_tache).getNDate(-8)) && !now.isWeAreGreatInSameDay(28))
                            ) && (notifications.filter(not => not.noReceived).length > 0)) && (
                                    <View>
                                        <View>
                                            <Ionicons
                                                name='warning-outline'
                                                size={110}
                                                color={"#fece00"}
                                                style={{ textAlign: "center" }}
                                            />
                                        </View>
                                        <View>
                                            <View>
                                                <Text
                                                    style={{ fontSize: 16 }}
                                                >
                                                    Nous somme le {new Date(nextTache?.date_tache).getNDate(-8).formatFrenchLong()} et nous n'avons pas reçu vos facture
                                                </Text>
                                                <ListItem bottomDivider containerStyle={{ paddingHorizontal: 0, marginHorizontal: 0 }}>
                                                    {
                                                        notifications.map((notification, i) => {
                                                            return (
                                                                <ListItem.Content key={i}>
                                                                    <ListItem.Title>
                                                                        {notification.category}
                                                                    </ListItem.Title>
                                                                    <View style={{ flex: 1, width: '100%' }}>
                                                                        {notification.noReceived.map((date_tache, j) => (
                                                                            <ListItem bottomDivider key={j} containerStyle={{ paddingHorizontal: 0, marginHorizontal: 0 }}>
                                                                                <ListItem.Subtitle>
                                                                                    {new Date(date_tache).formatFrenchLong(true)}
                                                                                </ListItem.Subtitle>

                                                                            </ListItem>
                                                                        ))}
                                                                    </View>


                                                                </ListItem.Content>
                                                            )
                                                        })
                                                    }
                                                </ListItem>
                                            </View>


                                        </View>
                                    </View>
                                )}
                        </>
                    )}

                                                </Card>*/}
                </View>
            </ContainerBackground>
        </ScrollView>

    )
}

export default PieceManquante