import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

export const hashedPassword = async(password)=>{
    return await bcrypt.hash(password , saltRounds);
}

export const comparePassword = async(password, hash) => {
    return await bcrypt.compare(password, hash);
}