import { serverBaseUrl } from "../utils/serverBaseUrl";
import Cookies from "js-cookie";
const userId = Cookies.get("task-management-app-userId");
const token = Cookies.get("task-management-app-accessToken");

//get user's task list
export const getUsersTaskLists = async () => {
  if (!userId || !token) {
    return (window.location.href = "/auth/login");
  }
  try {
    const result = await serverBaseUrl.get(`/task/task-list/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (result?.data?.success) {
      return result.data.data;
    } else {
      return null;
    }
  } catch (error: any) {
    console.log(error);
    if (error?.response?.data?.redirect) {
      window.location.href = "/auth/login";
    }
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
  if (res?.data?.success) {
    return res.data.data;
  } else {
    return null;
  }
};

//update task details
export const updateTask = async (taskId: string, data: any) => {
  await serverBaseUrl.patch(`/task/update/${taskId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//create new task
export const createNewTask = async (payload: any) => {
  const result = await serverBaseUrl.post("/task/create-new", payload);
  if (result?.data?.success) {
    return { success: true };
  } else return null;
};

//soft delete task
export const deleteTask = async (id: string) => {
  const result = await serverBaseUrl.patch(`/task/soft-delete/${id}`,{},{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  if (result?.data?.success) {
    return { success: true };
  } else {
    return null;
  }
};
