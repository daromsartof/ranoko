import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const ContainerWithLoading = ({
    isLoading,
    children,
    loadingContainerStyle,
    containerStyle
}) => {

    if (isLoading) return (
        <View style={loadingContainerStyle}>
            <ActivityIndicator />
        </View>
    )
  return (
    <View style={containerStyle}>
        {children}
    </View>
  )
}

export default ContainerWithLoading