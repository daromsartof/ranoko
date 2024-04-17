import React from 'react'
import { View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { RenderPieLegend } from './RenderLegend'

const RenderPie = ({legend, data, label, radius}) => {
    return (
        <View>
            <PieChart
                data={data}
                showText
                textColor="black"
                radius={radius}
                textSize={15}
                focusOnPress
            />
            {data.find(data => data.value) && (
                <RenderPieLegend datas={legend} label={label} />
            )}
            
        </View>
    )
}

export default RenderPie