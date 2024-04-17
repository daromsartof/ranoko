import { CurveType, LineChart } from "react-native-gifted-charts"
import { amountFormatter, getLineData } from "../services/indicateur.service"

const VerticalLineChart = ({
    datas = {},
    config,
}) => {
    const data = {
        one: getLineData(datas, 0, config.withStart),
        two: getLineData(datas, 1, config.withStart),
        three: getLineData(datas, 2, config.withStart),
        four: getLineData(datas, 3, config.withStart)
    }
    return <LineChart 
        maxValue={config.noOfSections * config.stepValue}
        stepValue={config.stepValue}
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisTextNumberOfLines={50}
        yAxisLabelWidth={45}
        yAxisTextStyle={{ color: 'black', fontSize: 12 }}
        formatYLabel={(props) => amountFormatter(props, 0)}
        stepHeight={40} 
        thickness={6}
        spacing={config.lineSpacing ?? config.labelWidth}
        curveType={CurveType?.CUBIC || 0}
        noOfSections={config.noOfSections}
        noOfSectionsBelowXAxis={config.noOfSectionsBelowXAxis}
        data={data.one}
        dataPointsColor1={data.one ? data.one[1]?.frontColor : 'black'}
        color1={data.one ? data.one[1]?.frontColor : 'black'}

        data2={data.two}
        dataPointsColor2={data.two ? data.two[1]?.frontColor : 'black'}
        color2={data.two ? data.two[1]?.frontColor : 'black'}

        data3={data.three}
        dataPointsColor3={data.three ? data.three[1]?.frontColor : 'black'}
        color3={data.three ? data.three[1]?.frontColor : 'black'}

        data4={data.four}
        dataPointsColor4={data.four ? data.four[1]?.frontColor : 'black'}
        color4={data.four ? data.four[1]?.frontColor : 'black'}
        
        color5={data.four ? data.four[1]?.frontColor : 'black'}
        showVerticalLines
    />
}

export {
    VerticalLineChart
}