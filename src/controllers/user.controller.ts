import { controller, httpPost, httpDelete, httpGet } from "inversify-express-utils";
import { Repository } from "typeorm";
import { User } from "../entities/user";
import { inject } from "inversify";
import { TYPE } from "../constants/types";
import { Request } from "express";

@controller("/v1/users")
export class UserController {
    private readonly _userRepository: Repository<User>;
    public constructor(@inject(TYPE.UserRepository) userRepository: Repository<User>) {
        this._userRepository = userRepository;
    }

    @httpGet("/")
    public async findAll(req: Request) {
        try {
            return await this._userRepository.find();
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/")
    public async create(req: Request) {
        try {
            return await this._userRepository.save(req.body);
        } catch (error) {
            throw error;
        }
    }

    @httpDelete("/:id")
    public async delete(req: Request) {
        try {
            const result = await this._userRepository.delete(req.params.id);
            if (result) {
                return { isDeleted: true };
            }
        } catch (error) {
            throw error;
        }
    }
}