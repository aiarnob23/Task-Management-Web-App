import { User } from "../models/user.model.js"

//create new user
const createNewUser = async(payload)=>{
    const result = await User.create(payload);
    const {password, ...data} = result.toObject();
    return data;
}

//get user hash pass 
const getUserPass = async(email)=>{
    const result = await User.findOne({email:email});
    return result;
}
export const userService = {
    createNewUser,
    getUserPass,
}