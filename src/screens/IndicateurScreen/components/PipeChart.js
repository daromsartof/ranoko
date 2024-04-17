import React from 'react'
import { PieChart } from 'react-native-gifted-charts'
import { PERIODE, PIE_COLORS, getDefaultColor, getLineData, isChecked } from '../services/indicateur.service'
import { View } from 'react-native'
import { RenderPieLegend } from './_parcials/RenderLegend'
import RenderPie from './_parcials/RenderPie'

const PipeChart = ({
    datas,
    activePeriod,
    primaryColor
}) => {
    const data_one = getLineData(datas, 0).map((d, i) => {
        const tmp_val = {
            label: d.label,
            text: `${parseInt(Math.abs(d.value))} jours`,
            value: parseInt(Math.abs(d.value))
        }
        if (!isChecked(activePeriod, PERIODE.ANN)) tmp_val.color = PIE_COLORS[i]
        else tmp_val.color = getDefaultColor(primaryColor)[0].frontColor
        return tmp_val
    })

    const data_two = getLineData(datas, 1).map((d, i) => {
        const tmp_val = {
            label: d.label,
            text: `${parseInt(Math.abs(d.value))} jours`,
            value: parseInt(Math.abs(d.value))
        }
        if (!isChecked(activePeriod, PERIODE.ANN)) tmp_val.color = PIE_COLORS[i]
        else tmp_val.color = getDefaultColor(primaryColor)[1].frontColor
        return tmp_val
    })

    const data_three = getLineData(datas, 2).map((d, i) => {
        const tmp_val = {
            label: d.label,
            text: `${parseInt(Math.abs(d.value))} jours`,
            value: parseInt(Math.abs(d.value))
        }
        if (!isChecked(activePeriod, PERIODE.ANN)) tmp_val.color = PIE_COLORS[i]
        else tmp_val.color = getDefaultColor(primaryColor)[2].frontColor
        return tmp_val
    })
    
    return (
        <View style={{width: '100%', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
            {isChecked(activePeriod, PERIODE.ANN) ? (
                <View>
                    <PieChart
                        data={[
                            ...data_one,
                            ...data_two,
                            ...data_three
                        ]}
                        showText
                        textColor="grey"
                        radius={150}
                        textSize={16}
                        focusOnPress
                        textBackgroundRadius={0}
                    />
                </View>
            ) : (
                <View>
                    <RenderPie radius={120} data={data_one} legend={data_one} label={new Date().getFullYear() - 2} />
                    <RenderPie radius={120} data={data_two} legend={data_one} label={new Date().getFullYear() - 1} />
                    <RenderPie radius={120} data={data_three} legend={data_one} label={new Date().getFullYear()} />
                </View>
            )
            }
        </View>

    )
}

export default PipeChart