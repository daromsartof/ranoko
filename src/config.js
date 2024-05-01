export const BASE_URL = 'http://192.168.1.115:3000'
export const COMPTA_GESTION_URL = 'https://comptaetgestion.fr/databonita/ind/indicateur/show'
export const LOGIN_URL = `${BASE_URL}/login`
export const API_URL = {
    CAISSE: '/api/get-caisse',
    TAKE_WATER: '/api/take-water'
}

export const PRIMARY_COLOR = '#90a333'
export const ERROR_COLOR = '#6a201c'
export const SECONDARY_COLOR = '#049fe9'

export const SHADOW_COLOR = '#8d8d8d'
export const SHADOW_OPACITY = 1


export const imageAssets = {
    hakarano: require('../assets/images/hakarano.png'),
    ireompakarano: require('../assets/images/ireompakarano.png'),
    bg: require('../assets/images/logoRanoko.png'),
    hakaranoIllustration: require('../assets/images/hakaranoillustration.webp'),
    boitindrakitra: require('../assets/images/boitindrakitra.png'),
    logout: require('../assets/images/dec.png')
}

export const CALANDAR_CONFIG = {
    YEARS: "A",    
    SEMESTRE: {
        SEMESTRE_1: "S1",
        SEMESTRE_2: "S2"
    },
    TRIMESTRE: {
        TRIMESTRE_1: "T1",
        TRIMESTRE_2: "T2",
        TRIMESTRE_3: "T3",
        TRIMESTRE_4: "T4"
    },
    MONTH: {
        ["01"]: "JAN",
        ["02"]: "FEV",
        ["03"]: "MAR",
        ["04"]: "AVR",
        ["05"]: "MAI",
        ["06"]: "JUI",
        ["07"]: "JUL",
        ["08"]: "AOU",
        ["09"]: "SEP",
        ["10"]: "OCT",
        ["11"]: "NOV",
        ["12"]: "DEC"
    }

}