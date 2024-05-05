import axios from '../../../components/common/services/axios'
import { API_URL } from '../../../config'

class BoitindrakitraService {
    async getBoitindrakitra (token) {
        try {
            const boitindrakitra = await axios.get(
                API_URL.BOITINDRAKITRA,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return boitindrakitra.data
        } catch (error) {
            console.log(error)
            return {
                sum: 0,
                history: []
            }
        }
    }
}

export default new BoitindrakitraService()