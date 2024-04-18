

import { Button, Icon, ListItem } from '@rneui/themed'
import { StyleSheet, Text, SafeAreaView, View, FlatList } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const ListUserScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
            renderItem={({ item }) => (
              <ListItem onPress={() => navigation.navigate("UserProfileScreen")}>
                <ListItem.Content>
                  <ListItem.Title>Email from John Doe</ListItem.Title>
                  <ListItem.Subtitle>Hey, I'm John Doe</ListItem.Subtitle>
                </ListItem.Content>
                <Icon name="label-important-outline" type="material" />
              </ListItem>
            )}
            keyExtractor={item => item}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ListUserScreen
