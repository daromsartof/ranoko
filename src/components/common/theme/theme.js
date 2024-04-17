import { StyleSheet } from "react-native"

export default StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bgStatus: {
        danger: {
            backgroundColor: '#f8d7da'
        },
        success: {
            backgroundColor: '#d4edda'
        },
        warning: {
            backgroundColor: '#fff3cd'
        }
    },
    textStatus: {
        danger: {
            backgroundColor: '#721c24'
        },
        success: {
            backgroundColor: '#d4edda'
        },
        warning: {
            backgroundColor: '#856404'
        }
    }, 
    mH:{
        1: {
            marginHorizontal: 10
        },
        2: {
            marginHorizontal: 20
        }
    },
    mV: {
        1: {
            marginVertical: 10
        },
        2: {
            marginVertical: 20
        }
    }
})
