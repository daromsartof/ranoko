import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'white',
        flexGrow: 1
    },
    body: {
        margin: 10,
        flex: 2,
        justifyContent: 'flex-start'
    },
    footer: {
        flex: 2,
        justifyContent: 'flex-end'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        marginHorizontal: 20,
        backgroundColor: '#d4edda',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: '#F194FF'
    },
    textStyle: {
        color: '#155724',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        textAlign: 'center',
        fontSize:18
    }
})
