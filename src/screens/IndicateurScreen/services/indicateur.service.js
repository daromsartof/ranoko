import axios from "axios"
import { CALANDAR_CONFIG, COMPTA_GESTION_URL, LAST_MAJ_URL } from "../../../config"
import { calculateChartParameters } from "./utils"

const VENTE_LIBELLE = "VENTES"
const GRAPH_TYPES = {
    LINE: {
        name: 'LINE',
        iconName: 'linechart'
    },
    HISTO: {
        name: 'HISTO',
        iconName: 'barschart'
    },
    SCIRCLE: {
        name: 'SCIRCLE',
        iconName: 'piechart'
    }
}

const GRAPH_COLORS = [
    {
        frontColor: 'red', gradientColor: '#93FCF8'
    },
    { frontColor: '#3BE9DE', gradientColor: '#93FCF8' }
]

const PIE_COLORS = ['#EC6B56', '#3BE9DE', '#47B39C', '#9205b3']

const PERIODE = {
    MONTH: 0,
    SEM: 1,
    TRIM: 2,
    ANN: 3
}

const DEFAULT_CONFIG = {
    [PERIODE.ANN]: {
        barWidth: 90,
        lineSpacing: 200,
        labelWidth: 90,
        stepHeight: 40,
        withStart: true,
        yAxisLabelWidth: 50
    },
    [PERIODE.SEM]: {
        barWidth: 50,
        labelWidth: 80,
        lineSpacing: 120,
        stepHeight: 50,
        withStart: true
    },
    [PERIODE.TRIM]: {
        barWidth: 30,
        labelWidth: 90,
        stepHeight: 40
    }
}


/**
 * 
 * @param {Array} mois 
 * @returns {{
 * SEM: Array,
* TRIM: Array,
* ANN: Array}}
 */
const getPeriodParams = (mois) => {
    return {
        SEM: [{ libelle: "S1", moiss: mois.slice(0, 6) }, { libelle: "S2", moiss: mois.slice(6, 12) }],
        TRIM: [{ libelle: "T1", moiss: mois.slice(0, 3) }, { libelle: "T2", moiss: mois.slice(3, 6) }, { libelle: "T3", moiss: mois.slice(6, 9) }, { libelle: "T4", moiss: mois.slice(9, 12) }],
        ANN: [{ libelle: "A", moiss: mois }]
    }
}


/**
 * 
 * @param {{
 * categories: []
 * datas: {}
 * }} response 
 * @param {{
 * libelle: string,
 * type_graphe: string,
 * indicateur: string
 * }} indicateur 
 * @param {Array} exercices 
 * @param {Array} colors
 * @param {Object} defaultConfig
 */
const valueFormatter = (response, indicateur, colors, defaultConfig = {}) => {
    const tempValue = {
        barChartData: [],
        lineChartData: {},
        config: {},
        ...indicateur
    }
    const { value } = response
    const exercices = value ? Object.keys(value).sort() : []
    const abreviation = {
        S1: 'Semestre 1',
        S2: 'Semestre 2',
        T1: 'Trimestre 1',
        T2: 'Trimestre 2',
        T3: 'Trimestre 3',
        T4: 'Trimestre 4'
    }
    response.categories.map((category, i) => {
        tempValue.barChartData.push(
            ...exercices.map((e, exercice_index) => {
                const { data } = value[e]
                const chartData = {
                    value: data[i] ? indicateur.libelle.match(/nombre de jours/i) ? Math.abs(data[i]) : data[i] : 0,
                    frontColor: colors[exercice_index]?.frontColor ?? '#006DFF',
                    gradientColor: colors[exercice_index]?.gradientColor ?? '#009FFF',
                    spacing: exercice_index === (exercices.length - 1) ? 40 : 4,
                    label: exercice_index === 0 ? abreviation[category] ?? category : ""
                }
                //for the line chart data only format
                if (tempValue.lineChartData.hasOwnProperty(e)) {
                    tempValue.lineChartData[e].push(chartData)
                } else {
                    tempValue.lineChartData[e] = [chartData]
                }

                return chartData
            })
        )
    })
    tempValue.config = calculateChartParameters(tempValue.barChartData, defaultConfig)
    tempValue.value = value
    return tempValue
}


const getLineData = (datas, index, withStart = false) => {
    const key = Object.keys(datas)[index] ?? undefined
    let response = undefined
    if (key && datas[key]) {
        const start = datas[key] > 0 ? datas[key][0] : {}
        start.value = 0
        response = withStart ? [start] : []
        response.push(...datas[key])
    }
    return response
}

const divideIntoYears = (data, colors, libelle) => {
    const barChartData = []
    const defaultColor = { frontColor: '#006DFF', gradientColor: '#009FFF' }
    const lineChartData = {}

    Object.keys(data).map((key, i) => {
        const value = data[key]?.data
        const tempValue = {
            value: Number(value.reduce((acc, val) => {
                if (libelle.match(/nombre de jours/i)) {
                    return acc + Math.abs(val)
                } else {
                    return acc + val
                }
            }, 0).toFixed(2)),
            frontColor: colors[i]?.frontColor ?? defaultColor.frontColor,
            gradientColor: colors[i]?.gradientColor ?? defaultColor.gradientColor,
            spacing: 10,
            label: key
        }
        barChartData.push(
            tempValue
        )
        lineChartData[key] = [tempValue]
    })

    const config = calculateChartParameters(barChartData, {
        barWidth: 150,
        labelWidth: 100,
        stepHeight: 40
    })

    return { barChartData, config, lineChartData }
}

const isChecked = (value, key) => value === key

const getDefaultColor = (primaryColor, withPrimaryColor = false) => {
    // console.log(primaryColor)#002b7f
    return ([
        {
            frontColor: withPrimaryColor ? primaryColor : '#002b7f', gradientColor: '#2e698d'
        },
        { frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
        { frontColor: '#EC6B56', gradientColor: '#ff8875' },
        { frontColor: '#47B39C', gradientColor: '#5cd7bd' }

    ])
}

const amountFormatter = (number, decimal = 2, show_zero = false, local = 'fr-FR') => {
    const formatter = new Intl.NumberFormat(local, {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal
    })
    if ((!show_zero && number === 0) || !number) return ''

    return formatter.format(number)
}

const reformatDataComparaison = ({ datas, categories }, colors, exercices, nombre_de_comparaison = 4) => {
    let barChartData = []
    const lineChartData = {}
    const len = Array.isArray(datas) ? datas[0].data.length / exercices.length : 0
    exercices.sort().reverse().map((exercice, j) => {
        const temps = {
            bar: [],
            line: {}
        }
        for (let i = 0; i < len; i++) {
            datas.map((category, index) => {
                const entry = {
                    value: category.data[i + (j * len)],
                    ...colors[index % colors.length],
                    text: `${parseInt(category.data[i + (j * len)])}`,
                    legend: category.name,
                    spacing: index === (nombre_de_comparaison - 1) ? 40 : 4,
                    label: index === 0 ? `${categories[i + (j * len)]}` : ""
                }

                if (temps.line.hasOwnProperty(category.name)) {
                    temps.line[category.name].push(entry)
                } else {
                    temps.line[category.name] = [entry]
                }

                temps.bar.push(entry)
            })

        }
        Object.keys(temps.line).map((key) => {
            if (lineChartData.hasOwnProperty(key)) {
                lineChartData[key] = [...temps.line[key], ...lineChartData[key]]
            } else {
                lineChartData[key] = temps.line[key]
            }
        })
        barChartData = [...temps.bar, ...barChartData]
    })

    const config = calculateChartParameters(barChartData, {
        labelWidth: 100,
        lineSpacing: 100
    })

    return {
        barChartData,
        lineChartData,
        value: datas,
        config,
        isComparaison: true,
        labels: barChartData.slice(0, nombre_de_comparaison)
    }
}

/**
 * check if data is comparaison
 * @param {Object} datas 
 * @returns {boolean}
 */
const isComparaison = (datas) => datas.categories.length > 12

const isNombreDeJours = (libelle = '') => libelle.match(/nombre de jours/i)


const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}

const fetchIndicateurDetails = async (params, exercices) => {
    const defaultRespone = await axios
        .post(
            COMPTA_GESTION_URL,
            JSON.stringify(params),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    const res = defaultRespone.data
    res.value = {}

    exercices.map(e => {
        res.value[e] = res.datas.find(({ name }) => name === e)
    })
    return {
        defaultRespone,
        res
    }
}

const isLandingPage = (index, items) => {
    return index === items.length + 1
}

const getPeriodParamsFromCalandarFilter = (PERIODE_PARAMS, active, currentExercice, isCumul = false) => {

    switch (active.value) {
        case CALANDAR_CONFIG.YEARS:
            return PERIODE_PARAMS.ANN.map((item) => ({
                libelle: currentExercice,
                moiss: item.moiss
            }))

        case CALANDAR_CONFIG.SEMESTRE.SEMESTRE_1:
        case CALANDAR_CONFIG.SEMESTRE.SEMESTRE_2:
            if (isCumul) {
                const res = []
                for (let i = 1; i <= parseInt(active.value[active.value.length - 1]); i++) {
                    let current = `${active.value[0]}${i}`
                    res.push(...PERIODE_PARAMS.SEM.map((item) => {
                        if (item.libelle === current) {
                            return {
                                libelle: `${current} ${currentExercice}`,
                                moiss: item.moiss
                            }
                        }
                    }).filter(item => item))
                }
                return res
            } else {
                return PERIODE_PARAMS.SEM.map((item) => {
                    if (item.libelle === active.value) {
                        return {
                            libelle: `${active.label} ${currentExercice}`,
                            moiss: item.moiss
                        }
                    }
                }).filter(item => item)
            }
            

        case CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_1:
        case CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_2:
        case CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_3:
        case CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_4:
            if (isCumul) {
                const res = []
                for (let i = 1; i <= parseInt(active.value[active.value.length - 1]); i++) {
                    let current = `${active.value[0]}${i}`
                    res.push(...PERIODE_PARAMS.TRIM.map((item) => {
                        if (item.libelle === current) {
                            return {
                                libelle: `${current} ${currentExercice}`,
                                moiss: item.moiss
                            }
                        }
                    }).filter(item => item))
                }
                return res
            } else {
                return PERIODE_PARAMS.TRIM.map((item) => {
                    if (item.libelle === active.value) {
                        return {
                            libelle: `${active.label} ${currentExercice}`,
                            moiss: item.moiss
                        }
                    }
                }).filter(item => item)
            }
        default:
            const now = new Date()
            if (isCumul) {
                const res = []
                for (let i = 1; i <= active.value; i++) {
                    now.setMonth(i - 1)
                    res.push({
                        "libelle": `${now.toLocaleString('fr', {
                            month: 'long'
                        })} ${currentExercice}`, "moiss": [`${i < 10 ? "0" : ""}${i}`]
                    })
                }
                return res
            } else {
                now.setMonth(active.value - 1)
                return [{
                    "libelle": `${now.toLocaleString('fr', {
                        month: 'long'
                    })} ${currentExercice}`, "moiss": [`${active.value < 10 ? "0" : ""}${active.value}`]
                }]
            }
    }
}

const calculePourcentage = (current, next, isNombredeJours = false) => {
    if (!next) return "0"
    if (isNombredeJours) return ((Math.abs(parseInt(current)) - Math.abs(parseInt(next))) / Math.abs(parseInt(next))) * 100
    return ((parseInt(current) - parseInt(next)) / parseInt(next)) * 100

}

const isNegativeInString = (value) => {
    return /-/.test(value)
}

const getParamsLastAndNext = (PERIODE_PARAMS, currentExercice, activeCalandar, isCummul = false) => {
    const response = {
        last: {
            exercices: [currentExercice - 1],
            periodes: null,
            label: currentExercice - 1
        },
        next: {
            exercices: [currentExercice - 2],
            periodes: null,
            label: currentExercice - 2
        }
    }
    switch (activeCalandar.value) {
        case CALANDAR_CONFIG.YEARS:
            return response
        case CALANDAR_CONFIG.SEMESTRE.SEMESTRE_1:
        case CALANDAR_CONFIG.SEMESTRE.SEMESTRE_2:
        case CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_1:
        case CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_2:
        case CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_3:
        case CALANDAR_CONFIG.TRIMESTRE.TRIMESTRE_4:
            response.last.periodes = getPeriodParamsFromCalandarFilter(PERIODE_PARAMS, {
                value: activeCalandar.value,
                label: activeCalandar.value
            }, response.last.exercices[0], isCummul)
            response.next.periodes = getPeriodParamsFromCalandarFilter(PERIODE_PARAMS, {
                value: activeCalandar.value,
                label: activeCalandar.value
            }, response.next.exercices[0], isCummul)
            response.last.label = `${activeCalandar.value} ${response.last.exercices[0]}`
            response.next.label = `${activeCalandar.value} ${response.next.exercices[0]}`
            break
        default:
            const now = new Date()
            now.setMonth(activeCalandar.value - 1)
            response.last.label = `${now.toLocaleString('fr', { month: 'long' })} ${response.last.exercices[0]}`
            response.next.label = `${now.toLocaleString('fr', { month: 'long' })} ${response.next.exercices[0]}`

            response.last.periodes = getPeriodParamsFromCalandarFilter(PERIODE_PARAMS, {
                value: activeCalandar.value,
                label: response.last.label
            }, response.last.exercices[0], isCummul)
            response.next.periodes = getPeriodParamsFromCalandarFilter(PERIODE_PARAMS, {
                value: activeCalandar.value,
                label: response.next.label
            }, response.next.exercices[0], isCummul)

    }
    return response
}

const getLastMaj = async (dossierId, exercice, token) => {
    return axios.get(LAST_MAJ_URL.replace('{{dossier_id}}', dossierId), {
        params: {
            exercice
        },
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        }
    })
} 
export {
    VENTE_LIBELLE,
    DEFAULT_CONFIG,
    getLastMaj,
    calculePourcentage,
    getPeriodParamsFromCalandarFilter,
    getPeriodParams,
    reformatDataComparaison,
    fetchIndicateurDetails,
    isNegativeInString,
    getKeyByValue,
    GRAPH_TYPES,
    PERIODE,
    PIE_COLORS,
    valueFormatter,
    GRAPH_COLORS,
    isChecked,
    getLineData,
    divideIntoYears,
    getDefaultColor,
    amountFormatter,
    isComparaison,
    isNombreDeJours,
    isLandingPage,
    getParamsLastAndNext
}