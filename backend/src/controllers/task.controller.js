import { taskService } from "../services/task.service";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

//create new task
const createNewTask = catchAsync(async(req,res)=>{
    const payload = req?.body;
    if(payload){
        const result = await taskService.createNewTask(payload);
        if(result){
            return sendResponse(res,{
                success:true,
                statusCode:200,
                message:"Task created successfully",
                data:result
            })
        }
    }
    return sendResponse(res,{
        success:false,
        statusCode:500,
        message:"Something went wrong",
        data:null
    })
})

//update task details
const updateTask = catchAsync(async(req,res)=>{
    const payload = req?.body;
    const _id = req?.params?.id;
    if(payload){
        const result = await taskService.updateTask(_id, payload);
        if(result){
            return sendResponse(res,{
                success:true,
                statusCode:200,
                message:"Task updated successfully",
                data:result
            })
        }
    }
    return sendResponse(res,{
        success:false,
        statusCode:500,
        message:"Something went wrong",
        data:null
    })
})

export const taskController = {
    createNewTask,
    updateTask,
}