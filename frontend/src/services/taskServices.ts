import { serverBaseUrl } from "../utils/serverBaseUrl";
import Cookies from "js-cookie";
const userId = Cookies.get("task-management-app-userId");
const token = Cookies.get("task-management-app-accessToken");

//get user's task list
export const getUsersTaskLists = async () => {
  if (!userId) {
    return (window.location.href = "/auth/login");
  }
  const result = await serverBaseUrl.get(`/task/task-list/${userId}`);
  if (result?.data?.success) {
    return result.data.data;
  } else {
    return null;
  }
};

//find a task details
export const getTaskDetails = async (taskId: string) => {
  if (!token) {
    return (window.location.href = "/auth/login");
  }
  if (!taskId) {
    return (window.location.href = "/dashboard");
  }
  const res = await serverBaseUrl.get(`/task/details/${taskId}`);
  console.log(res?.data?.success);
  if (res?.data?.success) {
    return res.data.data;
  } else {
    return null;
  }
};

//update task details
export const updateTask = async(taskId:string , data:any)=>{
  const result = await serverBaseUrl.patch(`/task/update/${taskId}`, data);
  console.log(result);
}

//create new task
export const createNewTask = async (payload: any) => {
  const result = await serverBaseUrl.post("/task/create-new", payload);
  if (result?.data?.success) {
    return { success: true };
  } else return null;
};

//soft delete task
export const deleteTask = async (id: string) => {
  const result = await serverBaseUrl.patch(`/task/soft-delete/${id}`);
  if (result?.data?.success) {
    return { success: true };
  } else {
    return null;
  }
};
