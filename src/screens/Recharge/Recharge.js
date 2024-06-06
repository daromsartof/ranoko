
import React from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView

} from 'react-native'
import CustomSelect from '../../components/CustomSelect/CustomSelect'
import CustomInput from '../../components/CustomInput'
import { Input } from '@rneui/themed'

const styles = StyleSheet.create({
})


const Recharge = ({ }) => {

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={{
            padding: 10
          }}>
            <CustomSelect
              label={"Mpaka rano hampidirana recharge"}
              withLabel
              placeholder={'mpaka rano'}
              items={[{
                label: 'romeo',
                value: 20
              },
              {
                label: 'sylvia',
                value: 22
              },
              {
                label: 'daniela',
                value: 23
              }]}
            />
            <View>
              <Text>{'vola arotsaka anaty boitindrakitra'}</Text>
            </View>
            <Input
              value={'0'}
              onChangeText={() => { }}
              placeholder={"0"}
              keyboardType='numeric'
            />
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Recharge
