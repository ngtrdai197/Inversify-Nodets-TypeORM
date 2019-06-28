import { IUserService } from "../interfaces/IServices/IUser.service";
import { User } from "../entities";
import { Repository } from "typeorm";
import { TYPE } from "../constants/types";
import { inject, injectable } from "inversify";

@injectable()
export class UserService implements IUserService {
    private readonly _userRepository: Repository<User>;
    public constructor(@inject(TYPE.UserRepository) userRepository: Repository<User>) {
        this._userRepository = userRepository;
    }

    findAll = async (): Promise<User[]> => {
        return await this._userRepository.find();
    }

    create = async (user: User): Promise<User> => {
        return await this._userRepository.save(user);
    }

    update = async (user: User): Promise<User> => {
        return await this._userRepository.save(user);
    }

    delete = async (id: string): Promise<any> => {
        return await this._userRepository.delete(id);
    }
} 