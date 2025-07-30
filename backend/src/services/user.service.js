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

//update user details 
const updateUserDetails = async(_id, payload)=>{
    const user = await User.findById(_id);
    const points = payload.points + user.points;
    const result = await User.findByIdAndUpdate(_id, {points:points});
    return result;
}
export const userService = {
    createNewUser,
    getUserPass,
    updateUserDetails,
}