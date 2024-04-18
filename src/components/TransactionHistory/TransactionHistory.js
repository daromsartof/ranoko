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
                nestedScrollEnabled
                renderItem={({ item }) => (
                    <ListItem bottomDivider containerStyle={{ backgroundColor: "transparent" }}>
                        <ListItem.Content>
                            <ListItem.Title>John Doe</ListItem.Title>
                            <ListItem.Subtitle>18 avril 2024</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Content>
                            <ListItem.Subtitle>20 000 ar</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}

                keyExtractor={item => item}
            />
    </View>
  )
}

export default TransactionHistory