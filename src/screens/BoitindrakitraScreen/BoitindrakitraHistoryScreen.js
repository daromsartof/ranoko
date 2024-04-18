import { ListItem } from '@rneui/themed'
import React from 'react'
import { FlatList, View } from 'react-native'
import TransactionHistory from '../../components/TransactionHistory'

const BoitindrakitraHistoryScreen = () => {
    return (
        <View>
            <TransactionHistory 
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
            />
        </View>
    )
}

export default BoitindrakitraHistoryScreen