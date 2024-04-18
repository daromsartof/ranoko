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
}

export default new HomeService()