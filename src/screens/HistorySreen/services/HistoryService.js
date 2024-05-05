import axios from '../../../components/common/services/axios'
import { API_URL } from '../../../config'

class HistoryService {
    async getMyHistory (token) {
        try {
            const historys = await axios.get(
                API_URL.MY_HISTORY,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return historys.data
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

export default new HistoryService()