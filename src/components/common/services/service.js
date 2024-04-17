const generateYearArray = () => {
    const currentYear = new Date().getFullYear()
    return [
        { label: `${currentYear - 2}`, value: currentYear - 2 },
        { label: `${currentYear - 1}`, value: currentYear - 1 },
        { label: `${currentYear}`, value: currentYear },
        { label: `${currentYear + 1}`, value: currentYear + 1 },
        { label: `${currentYear + 2}`, value: currentYear + 2 }
    ]
}

const getMonth = (num) => {
    const data = {
        1: "Janvier",
        2: "Février",
        3: "Mars",
        4: "Avril",
        5: "Mai",
        6: "Juin",
        7: "Juillet",
        8: "Août",
        9: "Septembre",
        10: "Octobre",
        11: "Novembre",
        12: "Décembre"
    }
    
    return data[num]
}

export {
    generateYearArray,
    getMonth
}