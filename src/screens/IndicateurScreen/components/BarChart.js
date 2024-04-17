import React from 'react'
import { BarChart } from "react-native-gifted-charts"
import { View, Text } from 'react-native'
import { amountFormatter } from '../services/indicateur.service'
import RenderLegend from './_parcials/RenderLegend'


const VerticalBarChart = ({
    datas,
    config
}) => {

    return (
        <View>
            {datas.length > 0 && (
                <BarChart
                    data={datas}
                    autoShiftLabels
                    noOfSectionsBelowXAxis={config.noOfSectionsBelowXAxis}
                    barWidth={config.barWidth ?? 20}
                    renderTooltip={(item) => {
                        return ( 
                            <View
                                style={{
                                    backgroundColor: item.frontColor,
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                    borderRadius: 4
                                }}>
                                <Text style={{ color: '#fff' }}>{amountFormatter(Math.round(item.value), 0)}</Text>
                            </View>
                        )
                    }}
                    //xAxisIndicesWidth={400}
                    barBorderRadius={3}
                    showGradient
                    yAxisThickness={1}
                    formatYLabel={(props) => amountFormatter(props, 0)}
                   // xAxisType={'dashed'}
                    xAxisThickness={1}
                    xAxisColor={'black'}
                    yAxisTextNumberOfLines={50}
                    
                    yAxisLabelWidth={config.yAxisLabelWidth || 45}
                    yAxisTextStyle={{ color: 'black', fontSize: 12 }}
                    maxValue={config.noOfSections * config.stepValue}
                    stepValue={config.stepValue}
                    noOfSections={config.noOfSections}
                    stepHeight={config.stepHeight ?? 40}
                   // xAxisTextNumberOfLines={3}
                    mostNegativeValue={config.noOfSectionsBelowXAxis * config.stepValue}
                    labelWidth={config.labelWidth ?? 40}
                    xAxisLabelTextStyle={{ textAlign: 'center', fontSize: 12 }}
                    lineConfig={{
                        color: '#F29C6E',
                        thickness: 3,
                        curved: true,
                        hideDataPoints: true,
                        shiftY: 20,
                        initialSpacing: -30
                    }}
                />
            )}
        </View>
    )
}

export {
    VerticalBarChart
}