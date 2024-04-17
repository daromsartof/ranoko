import React, { useState, useEffect, useContext } from "react"
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CATEGORIE_URL, UPLOAD_URL } from '../../config.js'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import CustomButton from '../../components/CustomButton'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0
    },
    item: {
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 8
    }
})

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
)

const SendingScreenList = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null)
    const [categories, setCategories] = useState([])

    const { userInfo } = useContext(AuthContext)

    const fetchCategories = async () => {
        const response = await axios.get(
            CATEGORIE_URL,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': userInfo.token
                }
            }
        )
        setCategories(response.data.data)
    }

    const { primaryColor, secondaryColor } = userInfo.personnalization

    useEffect(() => { fetchCategories() }, [])

    const renderItem = ({ item }) => {
        const backgroundColor = item.idCategory === selectedId ? primaryColor : secondaryColor
        const color = item.idCategory === selectedId ? secondaryColor : primaryColor

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.idCategory)
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        )
    }

    const sendImage = () => {

        // const navigationState = navigation.getState()
        // const { routes } = navigationState
        // const { params } = routes.find(r => r.name === 'Sending')


        // const data = {
        //     categorie: selectedId,
        //     fileContent: params.image
        // }

        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item.idCategory}
                extraData={selectedId}
            />
            <View>
                <CustomButton text='Envoyer' bgColor={primaryColor} onPress={sendImage}> </CustomButton>
            </View>
        </SafeAreaView>
    )
}


export default SendingScreenList