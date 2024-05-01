import axios from '../../components/common/services/axios'
import { API_URL } from '../../config'

class TakeWaterService {
    async takeWaterToday(data, token) {
        console.log(data, token)
        try {
            const response = await axios.post(
                API_URL.TAKE_WATER,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export default new TakeWaterService()