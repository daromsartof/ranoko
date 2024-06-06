import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Text } from '@rneui/themed'
import { Dropdown } from 'react-native-element-dropdown'

const styles = StyleSheet.create({
    container: {
        width: '100%'
        // flexGrow: 1,
        //   marginHorizontal: 10
    },
    label: {
        fontSize: 15,
        marginHorizontal: 5
    },
    input: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        color: 'black',
        borderBottomWidth: 2
    },
    dropdown: {
        margin: 10,
        marginHorizontal: 5,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textItem: {
        flex: 1,
        fontSize: 16
    },
    placeholderStyle: {
        fontSize: 14
    },
    selectedTextStyle: {
        fontSize: 14
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    }
})


const CustomSelect = ({ label, placeholder, selectedItem, items, onChange, withLabel = false, search = false, containerStyle = {} }) => {

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {withLabel && (
                <Text style={styles.label}>{label}</Text>
            )}
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={items}
                search={search}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                searchPlaceholder="Recherche..."
                value={selectedItem?.value ?? null}
                onChange={onChange}
                renderItem={renderItem}
            />
        </View>
    )
}


export default CustomSelect