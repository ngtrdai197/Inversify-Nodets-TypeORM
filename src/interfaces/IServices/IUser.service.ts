import { User } from "../../entities";

export abstract class IUserService {
    abstract findAll(): Promise<User[]>;
    abstract create(user: User): Promise<User>;
    abstract update(user: User): Promise<User>
    abstract delete(id: string): Promise<any>;
}