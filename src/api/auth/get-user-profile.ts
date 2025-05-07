import { apiHandler } from "../api-handler"

export const getUserProfile = async () => {
    return await apiHandler({
        endpoint: "api/profile"
    })
}