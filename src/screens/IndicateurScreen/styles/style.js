import { StyleSheet } from "react-native"
import { SHADOW_COLOR } from "../../../config"

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ffffff'
    },
    filtre: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
    },
    indicateurContainer: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderStyle:"solid",
        borderWidth:1,
        borderColor: SHADOW_COLOR
    },
    indicateurContent: {
        marginTop: 10,
        flex: 1,
        overflow:'hidden'
    },
    indicateurLabel: {
        textAlign: 'center',
        fontFamily: 'double',
        fontWeight: 'bold',
        fontSize: 12
    }, 
    pressableContainer: {
        marginRight: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 3
    },
    indicateurHead: { 
        flexDirection: "row", 
        alignItems: 'center', 
        justifyContent: "flex-end"
    },
    graphTypeContainer: { 
        flexDirection: "row", 
        alignItems: 'center', 
        justifyContent: 'space-between'
    }
})
