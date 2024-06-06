import { Pressable, Text, View, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SECONDARY_COLOR, SHADOW_COLOR, SHADOW_OPACITY } from '../../config'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        marginHorizontal: 5
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
        maxHeight: 50
    },
    label: {
        fontFamily: 'Fontastique',
        fontWeight: 'bold',
        textAlign:"center",
        fontSize: 14,
        color: 'white'
    },
    image: {
        width: 110,
        height: 110
    }
})

const MenuBox = ({ icon, text, onPress, bgColor, imgSrc, imgWidth=110 }) => {
    return (

        <Pressable onPress={onPress} style={{ flex: 0.5, margin: 5 }}>
            <View style={{ flexDirection: "column", justifyContent: "center", alignItems:"center" }}>
                <View>
                    {icon ? <Icon name={icon} size={60} color="#595c5a" /> : (
                        <Image style={[styles.image, {
                            width: imgWidth
                        }]} resizeMode='cover' source={imgSrc} />
                    )}
                </View>
                <View style={[{width: "100%",paddingVertical:5, backgroundColor: bgColor || SECONDARY_COLOR }]}>
                    <Text style={styles.label}>{text}</Text>
                </View>
            </View>
        </Pressable>

    )
}

export default MenuBox