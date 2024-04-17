import React from 'react'
import { View, Text } from 'react-native'
const RenderLegend = ({
    label,
    color,
    containerStyles = []
}) => {
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center'}, ...containerStyles]}>
            <View>
                <Text style={{ margin: 0, fontSize:11, padding: 0 }}>{label} : </Text>
            </View>
            <View style={{ width: 15, height: 9, backgroundColor: color }}></View>
        </View>
    )
}

const RenderPieLegend = ({
    label,
    datas
}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft:20}}>
            <View >
                <View>
                    <Text style={{ margin: 0, padding: 0, fontWeight: 'bold', fontSize: 20 }}>{label} | </Text>
                </View>
            </View>
            <View style={{flexDirection:'column', width: '40%'}}>
                {
                    datas.map((data, i) => (
                        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 2 }}>
                            <View>
                                <Text style={{ margin: 0, padding: 0 }}>{data.label} : </Text>
                            </View>
                            <View style={{ width: 30, height: 13, backgroundColor: data.color }}></View>
                        </View>
                    ))
                }
            </View>
            
        </View>
    )
}

export default RenderLegend
export {
    RenderPieLegend
}