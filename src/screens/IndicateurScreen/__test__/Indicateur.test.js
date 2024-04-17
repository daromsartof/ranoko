import { amountFormatter, getDefaultColor, getPeriodParams, reformatDataComparaison, valueFormatter } from "../services/indicateur.service"
import { calculateCumulativeSum, calculateDeCumulativeSum, cummulHandler } from "../services/utils"
Array.prototype.somme = function (isObject = false) {
    if (isObject) return this.reduce((prev, next) => prev + next.value, 0)
    else return this.reduce((a, b) => a + b, 0)
}

const colors = getDefaultColor("red")
const exercice = [2020, 2021]
const value = Array.from({length: 24}, () => Math.floor(Math.random() * 24));

describe('valueFormatter', () => {

    test('retourne une structure correcte avec des données vides', () => {
        const response = { categories: [], datas: {} }
        const indicateur = { libelle: '', type_graphe: '', indicateur: '' }
        const colors = []
        const defaultConfig = {}

        const result = valueFormatter(response, indicateur, colors, defaultConfig)

        expect(result).toHaveProperty('barChartData')
        expect(result.barChartData).toHaveLength(0)
        expect(result).toHaveProperty('lineChartData')
        expect(Object.keys(result.lineChartData)).toHaveLength(0)
    })

    test('gère correctement les données non valides', () => {
        const response = { categories: ['S1'], datas: { 2021: { data: ['invalid'] } } }
        const colors = []
        const defaultConfig = {}
        const indicateur = { libelle: '', type_graphe: '', indicateur: '' }
        const result = valueFormatter(response, indicateur, colors, defaultConfig)
        expect(result.barChartData).toHaveLength(0)
    })

})

describe('get period params', () => {
    const mois = ['JAN','FEB', 'MARCH', 'APR', 'MAY', 'JUL', 'JUIL', 'AUOT', 'SEP', 'OCT', 'NOV', 'DEC']
    test('should be return the correct period params', () => { 
        const params = getPeriodParams(mois)
        expect(params.SEM).toHaveLength(2)
        expect(params.ANN).toHaveLength(1)
        expect(params).toHaveProperty('SEM')
        expect(params).toHaveProperty('ANN')
        expect(params).toHaveProperty('TRIM')
        expect(params.TRIM).toHaveLength(4)
        expect(Object.keys(params)).toHaveLength(3)
    })
})

describe('reformat data comparaison', () => {
    const data = [
        {
            data: value,
            name: "Charges externes"
        },
        {
            data: value,
            name: "Autres charges externes"
        },
        {
            data: value,
            name: "Rémunération exploitant"
        },
        {
            data: value,
            name: "Charges de personnel"
        }
    ]
    const response = reformatDataComparaison({
        datas: data,
        categories: value
    }, colors, exercice)
    test("should return the correct params",() => {
        expect(response).toHaveProperty('barChartData')
        expect(response).toHaveProperty('lineChartData')
        expect(response.value).toHaveLength(data.length)
        expect(response.isComparaison).toBe(true)
    })

    test("should return the correct data formated",() => {
        expect(response.barChartData).toHaveLength(value.length * data.length)
        expect(Object.keys(response.lineChartData)).toHaveLength(data.length)
        expect(response.barChartData[0]).toHaveProperty('value')
        expect(response.barChartData[0].value).toEqual(value[12])
        expect(response.barChartData[12 * data.length].value).toEqual(value[0])
        expect(response.barChartData.somme(true)).toEqual(value.somme() * data.length)
    })

})

describe('Amout formater value', () => {
    test('should be return number', () => {
        const response = amountFormatter(20000)
        expect(typeof parseInt(response)).toEqual('number')
    })

    test('should be return an empty string', () => {
        const response = amountFormatter(0)
        expect(response).toEqual('')
        expect(amountFormatter(undefined, 2, false)).toEqual('')
    })

    test("should not return an empty string", () => {
        expect(amountFormatter(1, 2, true)).not.toBe('')
        expect(amountFormatter(10, 2, false)).not.toBe('10.00')
    })
})


describe('Cumul and Decumul', () => {
    const datas = [
        {value: 20}, {value: 30}, {value:40}
    ]
    const cum = calculateCumulativeSum(datas)
    test('should return the cumulate data', () => {
        expect(cum).toHaveLength(3)
        expect(cum[1].value).toEqual(50)
        expect(cum[2].value).toEqual(90)
        expect(cum[datas.length - 1].value).toEqual(datas.reduce((a, b) => a + b.value,0))
    })

    test('should return the decummulate data', () => {
        const decum = calculateDeCumulativeSum(cum)
        expect(decum).toHaveLength(3)
        expect(decum[0].value).toEqual(20)
        expect(decum[1].value).toEqual(30)
        expect(decum[datas.length - 1].value).toEqual(datas[datas.length - 1].value)
    })
})


describe('Cummul and Decummul Handler', () => {
    const exercices = [2022, 2023, 2024]
    const indicateurs = {
        lineChartData: {
            "2022": [
                {
                    "label": "JAN", 
                    "value": 22551
                }, 
                {
                    "label": "FEV", 
                    "value": 10528
                }, 
                {
                    "label": "MAR", 
                    "value": 17397
                }
            ], 
            "2023": [
                {
                    "label": "", 
                    "value": 44463
                },
                {
                    "label": "", 
                    "value": 22706
                }, 
                {
                    "label": "", 
                    "value": 26241
                }
            ], 
            "2024": [
                {
                    "label": "",
                    "value": 29533
                }, 
                {
                    "label": "",
                    "value": 28111
                }, 
                {
                    "label": "",
                    "value": 0
                }
            ]
        }
    }
   const resultCumul = cummulHandler(indicateurs, exercices, false, 12, true)
   test('should the greate cummul data', () => {
        expect(resultCumul.barChartData).toHaveLength(9)
        expect(resultCumul.barChartData[3].value).toEqual(33079)
   })

    test('should the greate decumul data', () => {
        const decum = cummulHandler(resultCumul, exercices, false, 12, false)
        expect(decum.barChartData).toHaveLength(9)
        expect(decum.barChartData[3].value).toEqual(10528)
        expect(decum.barChartData[4].value).toEqual(22706)
        expect(decum.barChartData[7].value).toEqual(26241)
        expect(decum.lineChartData[2024][2].value).toEqual(0)
    })
})