import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { getDefaultColor } from "../screens/IndicateurScreen/services/indicateur.service"

const useColor = (withPrimaryColor = false) => {
    const { userInfo } = useContext(AuthContext)
    const { personnalization } = userInfo
    const { primaryColor } = personnalization

    return getDefaultColor(primaryColor, withPrimaryColor)
}

export default useColor