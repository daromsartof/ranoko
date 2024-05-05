import axios from '../../../components/common/services/axios'
import { API_URL } from '../../../config'

class HomeService {
    async getMyCaisse (token) {
        try {
            const caisse = await axios.get(
                API_URL.CAISSE,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return caisse.data
        } catch (error) {
            return {
                amount: 0
            }
        }
    }

    async getMyWaterHistory(token) {
        try {
            const mywater = await axios.get(
                API_URL.MY_WATER,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return mywater.data
        } catch (error) {
            return {
                all: 0,
                today: 0,
                details: []
            }
        }
    }
}

export default new HomeService()