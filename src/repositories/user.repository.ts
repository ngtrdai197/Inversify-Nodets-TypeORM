import { getConnection } from "typeorm";
import { User } from "../entities/user";

export function getUserRespository(){
    const conn = getConnection();
    const userRepository = conn.getRepository(User);
    return userRepository;
}