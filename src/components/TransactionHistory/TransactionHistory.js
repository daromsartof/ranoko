import { ListItem } from '@rneui/themed'
import React from 'react'
import { FlatList, View } from 'react-native'

const TransactionHistory = ({
    data
}) => {
  return (
    <View>
         <FlatList
                data={data}
                renderItem={({ item }) => (
                    <ListItem bottomDivider containerStyle={{ backgroundColor: "transparent" }}>
                        <ListItem.Content>
                            <ListItem.Title>{item.caisse.user.name}</ListItem.Title>
                            <ListItem.Subtitle>{(new Date(item.created_at)).toLocaleString('fr', { timeZoneName: 'short' })}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content>
                            <ListItem.Subtitle
                                style={{
                                    color: item.credit ? 'green' : 'red',
                                    textAlign: 'center',
                                    width: '100%'
                                }}
                            
                            >{item.credit || item.debit} ar</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}

                keyExtractor={item => item.id}
            />
    </View>
  )
}

export default TransactionHistory