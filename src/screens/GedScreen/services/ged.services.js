/*import axios from "axios"
import { CATEGORIES_URL, GED_URL } from "../../../config"

const getCategoriesDossierImages = async (dossier_id, exercice, token) => {
    try {
        const response = await axios.get(`${CATEGORIES_URL}/images/${dossier_id}?exercice=${exercice}`, {
              headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token
              }
            })
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const DEFAULT_CATEGORIES = [
    {
        value: 0,
        label: "TOUS"
    }
]

const DISPLAY = {
    TABLE : 1,
    NOT_TABLE : 0
}

const getImages = async (token, dossier, exercice, category, imageId) => {
    return axios.get(`${GED_URL}/${dossier}/${exercice}?category=${category}?imageName=${imageId}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        }
    })
}

export {
    getCategoriesDossierImages,
    DEFAULT_CATEGORIES,
    DISPLAY,
    getImages
}
*/