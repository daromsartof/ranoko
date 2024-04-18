import { StyleSheet } from "react-native"
import { SECONDARY_COLOR } from "../../../config"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0
    },

    header: {
        flexDirection: 'row',
        paddingVertical: 20,
        backgroundColor: SECONDARY_COLOR,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    userContainer: {
        //flex: .6
    },
    userText: {
        color: 'white',
        paddingLeft: 10,
        fontFamily: 'Fontastique',
        fontSize: 20
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: .4,
        marginRight: 10

    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 45,
        resizeMode: 'contain'
    },
    content: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-end'
    },
    menuContainer: {
        flexDirection: "row", justifyContent:"space-between"
    },
    image: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    cell: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
    },
    badgeContainer: {
        width: 150, 
        height: 150, 
        borderRadius: 50, 
        backgroundColor: SECONDARY_COLOR, 
        justifyContent: 'center',
        alignItems: 'center'
      },
      badgeText: {
        color: '#fff', 
        fontSize: 16,
        fontWeight: 'bold'
      },
      ranotitle:{
        textAlign: 'center',
        padding: 20,
        fontWeight: 'bold',
        fontFamily: 'Fontastique',
        fontSize: 20
      },
      indiceContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around'
      }
})
export default styles  