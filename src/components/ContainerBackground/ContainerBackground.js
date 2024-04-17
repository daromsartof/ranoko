import React from 'react'
import { ImageBackground } from 'react-native'
import { imageAssets } from '../../config'

const ContainerBackground = ({ children }) => {
    return (
        <ImageBackground
            source={imageAssets.bg}
            resizeMode="cover"
            imageStyle={{ opacity: 1 }}>
            {children}
        </ImageBackground>
    )
}

export default ContainerBackground