import axios from "axios"
import { NOTIFICATION_URL } from "../../../config"
const now = new Date()
const calculExercice = ({ nom_tache, date_tache, cloture }) => {
    const currentYear = new Date().getFullYear()
    const dataTache = new Date(date_tache)
    switch (nom_tache) {
        case "DEB":
        case "CA3":
            const clo = parseInt(cloture) + 1
            const month = clo > 12 ? clo - 12 : clo
            if (month === dataTache.getMonth() + 1) {
                return currentYear - 1
            }
            break
        case "BNC_LIA":
        case "IS_LIAS":
        case "DAS2":
        case "IR_LIAS":
        case "CA12":
            if ((currentYear + 1) === dataTache.getFullYear()) {
                return currentYear
            } else {
                return currentYear - 1
            }
        default:
            break
    }
    return currentYear
}

const getNotifications = async (token, dossier_id, exercice) => {
    try {
        const res = await axios
            .get(NOTIFICATION_URL.replace('{dossier_id}', dossier_id), {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': token
                },
                params: {
                    exercice
                }
            })

        const response = res.data
        const notifications = response.data
        return notifications.map(notification => {
            if (!notification.noReceived) return notification
            const filtredNotif = notification.noReceived.filter((date_tache) => new Date(date_tache) < now)
            return {
                ...notification,
                noReceived: filtredNotif.length > 0 ? filtredNotif : null
            }
        })
    } catch (error) {
        console.error("axio ", error.message)
    }
}

export {
    calculExercice,
    getNotifications
}