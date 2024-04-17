function calculateCumulativeSum(data) {
    let cumulativeSum = 0
    
    return data.map(item => {
        const number = item.value || item
        cumulativeSum += Math.round(number)
        return {
            ...item,
            value: cumulativeSum ? parseInt(cumulativeSum) : 0
        }
    })
}

function calculateDeCumulativeSum(data) {
    return data.map((item, index, arr) => {
        if (index === 0 || item.value === 0) return item
        return {
            ...item,
            value: item.value - arr[index - 1].value
        }
    })
}

function convertToBarChartData(lineChartData) {
    return Object.keys(lineChartData)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(key => lineChartData[key])
}

function formatElementKeyValues(data, keyLength, index, obj) {
    data.forEach((item, k) => {
        obj[index + (k * keyLength)] = item
    })
    return obj
}

function calculateChartParameters(data, defaultConfig = {}, defaultStepValue = 200) {
    let maxValue = -Infinity
    let mostNegativeValue = 0

    data.forEach(item => {
        if (parseInt(item.value) > maxValue) {
            maxValue = parseInt(item.value)
        }
        if (parseInt(item.value) < 0 && parseInt(item.value) < mostNegativeValue) {
            mostNegativeValue = parseInt(item.value)
        }
    })

    const range = maxValue - mostNegativeValue
    let stepValue = maxValue < defaultStepValue ? 1 : defaultStepValue // Default step value, adjust as needed
    let noOfSections = Math.ceil(range / stepValue)
    let noOfSectionsBelowXAxis = mostNegativeValue < 0 ? Math.ceil(Math.abs(mostNegativeValue) / stepValue) : 0

    // Adjust stepValue if needed based on noOfSections
    while (noOfSections > 9) { // Assuming we don't want more than 10 sections
        stepValue += maxValue < defaultStepValue ? (maxValue < 50) ? 1 : 10 : 100
        noOfSections = Math.ceil(range / stepValue)
        noOfSectionsBelowXAxis = mostNegativeValue < 0 ? Math.ceil(Math.abs(mostNegativeValue) / stepValue) : 0
    }
    return { noOfSections, noOfSectionsBelowXAxis, stepValue, ...defaultConfig }
}


function cummulHandler(indicateur, exercices, isComparaison = false, division = 12, cummul = true) {
    const tempValue = {}
    const items = {}
    const lineChartData = {}
    let barChartData = []
    if (isComparaison) {
        const tempData = indicateur?.lineChartData || {}
        const keys = Object.keys(tempData)
        keys.forEach((key, index) => {
            lineChartData[key] = []
            items[key] = []
            const data = tempData[key]
            exercices.forEach((exercice, j) => {
                const chartDataForYearExercice = cummul ? calculateCumulativeSum(data.slice((division * j), ((j + 1) * division))) : calculateDeCumulativeSum(data.slice((division * j), ((j + 1) * division)))
                lineChartData[key] = [...lineChartData[key], ...chartDataForYearExercice]
            })
            formatElementKeyValues(lineChartData[key], keys.length, index, tempValue)
        })
    } else {
        exercices.map((exercice, i) => {
            const datas = indicateur.lineChartData[exercice]
            lineChartData[exercice] = cummul ? calculateCumulativeSum(datas) : calculateDeCumulativeSum(datas)
            const items = [...lineChartData[exercice]]
            items.map((item, j) => {
                tempValue[i + (j * (exercices.length))] = item
            })
            
        })
    }
    barChartData = convertToBarChartData(tempValue)

    const config = calculateChartParameters(barChartData, {
        barWidth: indicateur.config?.barWidth,
        labelWidth: indicateur.config?.labelWidth,
        lineSpacing: indicateur.config?.lineSpacing,
        stepHeight: indicateur.config?.stepHeight
    })

    return {
        lineChartData,
        barChartData,
        config
    }
}


export {
    calculateCumulativeSum,
    calculateDeCumulativeSum,
    convertToBarChartData,
    formatElementKeyValues,
    cummulHandler,
    calculateChartParameters
}
