import { serverBaseUrl } from "../utils/serverBaseUrl"

export const deleteTask = async(id:string)=>{
    const result = await serverBaseUrl.patch(`/task/soft-delete/${id}`);
    console.log(result);
}