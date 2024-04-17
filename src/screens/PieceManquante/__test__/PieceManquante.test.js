import { calculExercice } from "../services/PieceManquante.service"


describe('calculExercice', () => {
    const currentYear = new Date().getFullYear()

    test('returns current year - 1 for CA3 task if task month is the same as closing month', () => {
        const result = calculExercice({
            nom_tache: "CA3",
            date_tache: `${currentYear}-01-23`,
            cloture: 12
        })
        expect(result).toBe(currentYear - 1)
    })

    test('not returns current year - 1 for CA3 task if task month is the same as closing month', () => {
        const result = calculExercice({
            nom_tache: "CA3",
            date_tache: `${currentYear}-08-23`,
            cloture: 6
        })
        expect(result).not.toBe(currentYear - 1)
    })

    test('returns current year for IS_LIAS task if task year is next year', () => {
        const result = calculExercice({
            nom_tache: "IS_LIAS",
            date_tache: `${currentYear + 1}-04-23`,
            cloture: 12
        })
        expect(result).toBe(currentYear)
    })

    test('returns current year - 1 for IR_LIAS task if task year is next year', () => {
        const result = calculExercice({
            nom_tache: "IR_LIAS",
            date_tache: `${currentYear}-04-23`,
            cloture: 12
        })
        expect(result).toBe(currentYear - 1)
    })
})
