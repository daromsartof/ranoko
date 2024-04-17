import { Pressable, StyleSheet } from 'react-native'
import {  Text } from '@rneui/themed'
const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 5
    },
    container_PRIMARY: {
        backgroundColor: '#3B71F3'
    },
    container_TERTIARY: {

    },
    container_SECONDARY: {

    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "Fontastique"
    },

    text_SECONDARY: {
        color: '#3B71F3'
    },

    text_TERTIARY: {
        color: 'gray'
    }
})

const CustomButton = ({ onPress, text, type, bgColor, fgColor, customStyles = [], disabled }) => {
    return (
        <Pressable disabled={disabled} onPress={onPress} style={
            [
                styles.container,
                styles[`container_${type}`],
                bgColor ? { backgroundColor: bgColor } : {},
                ...(Array.isArray(customStyles) ? customStyles : [customStyles])
            ]
        }>
            {typeof text == "string" ? (
                <Text style={
                    [
                        styles.text,
                        styles[`text_${type}`],
                        fgColor ? { color: fgColor } : {}
                    ]
                }>
                    {text}
                </Text>
            ) : text}
            
        </Pressable>
    )
}

export default CustomButton