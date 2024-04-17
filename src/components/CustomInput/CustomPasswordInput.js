import {View, Text, StyleSheet, TextInput} from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {ERROR_COLOR, PRIMARY_COLOR} from '../../config.js'
import {Controller} from 'react-hook-form'
import { Input } from '@rneui/themed'

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff'
  },
  inputContainer: {
    flex: 0.9,
    overflow: 'hidden'
  },
  textError: {
    color: ERROR_COLOR,
    alignSelf: 'flex-start',
    paddingHorizontal: 10
  }
})

const CustomPasswordInput = ({
  control,
  name,
  placeholder,
  rules = {},
  secureTextEntry
}) => {
  const [showPassword, setShowPassword] = useState(!secureTextEntry)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
            <View style={styles.inputContainer}>
              <Input
                name={name}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                errorStyle={{ color: 'red' }}
                errorMessage={error ? (error.message || 'Erreur') : ''}
                rightIcon={<Icon
                  name={!showPassword ? 'eye' : 'eye-slash'}
                  size={20}
                  onPress={() => {
                    setShowPassword(!showPassword)
                  }}
                />}
                secureTextEntry={!showPassword}
              />
            </View>
        </>
      )}
    />
  )

  // return (
  // <View style={styles.container}>
  //   <View style={{flex: 0.9}}>
  //     <TextInput
  //       style={styles.input}
  //       autoCorrect={false}
  //       secureTextEntry={!showPassword}
  //     />
  //   </View>
  //   <View style={{alignItems: 'center', justifyContent: 'center', flex: 0.1}}>
  //     <Icon
  //       name={(!showPassword) ? 'eye' : 'eye-slash'}
  //       size={20}
  //       onPress={() => {
  //         setShowPassword(!showPassword)
  //       }}
  //     />
  //   </View>
  // </View>
  // )
}

export default CustomPasswordInput
