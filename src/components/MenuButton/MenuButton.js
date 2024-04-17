import { Pressable, Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    icon: {
        height: '50%',
        width: '100%'
    },
    text: {
        height: '30%',
        width: '100%'
    }
})

const MenuButton = ({ onPress, icon, bgColor, fgColor }) => {
    return (
        <Pressable onPress={onPress} style={styles.container} >
            <Icon name={icon} size={50} color={bgColor} style={styles.icon} />
            <View>
                <Text style={styles.text}>Prendre une photo</Text>
            </View>
        </Pressable>
    )
}

export default MenuButton