import React from 'react'
import { Pressable } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from '../styles/style'
/**
 * 
 * @param {{
 * iconType: 'AntDesign' | 'MaterialCommunityIcons'
 * iconName: string
 * onPress: Function
 * active: boolean,
 * primaryColor : string
 * }} param0 
 * @returns 
 */
const ButtonGraph = ({
    iconName,
    onPress,
    active,
    primaryColor
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.pressableContainer, { backgroundColor: active ? primaryColor : 'transparent' }]}>
            <AntDesign name={iconName} size={15} color={active ? '#fff' : "black"} />
        </Pressable>
    )
}

export default ButtonGraph