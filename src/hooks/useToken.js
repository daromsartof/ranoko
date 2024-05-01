import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const useToken = () => {
    const { userInfo } = useContext(AuthContext)
    return userInfo.token
}

export default useToken