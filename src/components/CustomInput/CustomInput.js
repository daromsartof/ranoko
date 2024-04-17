import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Controller } from 'react-hook-form'
import { ERROR_COLOR, PRIMARY_COLOR } from '../../config.js'
import { Input, Text } from '@rneui/themed'

const styles = StyleSheet.create({
  input: {
    width: '80%',
    color: 'black'
  },
  textError: {
    color: ERROR_COLOR,
    alignSelf: 'flex-start',
    paddingHorizontal: 10
  },
  containerCheck: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkedBox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginRight: 2
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold'
  },
  label: {
    color: 'black',
    marginRight: 10
  }
})

const CustomInput = ({
  control,
  name,
  placeholder,
  label,
  isChecked,
  type,
  primaryColor,
  onChange = () => { },
  rules = {},
  secureTextEntry,
  disabled
}) => {
  
  return (
    <>
      {
        {
          ['checkbox']: (
            <>
              {!disabled && <TouchableOpacity
                onPress={onChange}
                style={styles.containerCheck}
                disabled={disabled}
              >
                <View style={isChecked ? [styles.checkedBox, { backgroundColor: primaryColor }] : [styles.uncheckedBox, { backgroundColor: disabled ? "#f0f0f0" : '#FFF', borderColor: disabled ? "#fb6e6e" : primaryColor }]}>
                  {isChecked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.label}>{label}</Text>
              </TouchableOpacity>}
            </>
           
          )
        }[type] || (
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <>
                <View>
                  <Input
                    name={name}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    errorStyle={{ color: 'red' }}
                    errorMessage={error ? (error.message || 'Erreur') : ''}
                    secureTextEntry={secureTextEntry}
                  />     
                </View>
              </>
            )}
          />
        )
      }

    </>

  )
}

export default CustomInput
