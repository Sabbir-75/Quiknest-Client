import { use } from "react"
import { AuthContext } from "../../Context/AuthContext/AuthContext"

export const useAuth = () => {
    const useinfo = use(AuthContext)
    return useinfo
}