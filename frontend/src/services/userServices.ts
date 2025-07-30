import { serverBaseUrl } from "../utils/serverBaseUrl";
import Cookies from "js-cookie";
const id = Cookies.get("task-management-app-userId");
const token = Cookies.get("task-management-app-accessToken");

// update user details
export const updateUserDetails = async(data:any)=>{
    if(!token && !id){
        window.location.href="/auth/login";
    }
    await serverBaseUrl.patch(`/user/update/${id}`, data);
}