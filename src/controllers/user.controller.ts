import { controller, httpPost, httpDelete, httpGet, request, requestParam, httpPut, } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPE } from "../constants/types";
import { IUserService } from "../interfaces/IServices/IUser.service";
import * as express from 'express';
import { User } from "../entities";

@controller("/v1/users")
export class UserController {
    private readonly _userService: IUserService;
    public constructor(@inject(TYPE.IUserService) userService: IUserService) {
        this._userService = userService;
    }

    @httpGet("/")
    public async findAll() {
        try {
            return await this._userService.findAll();
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/")
    public async create(@request() req: express.Request) {
        try {
            return await this._userService.create(req.body as User);
        } catch (error) {
            throw error;
        }
    }

    @httpPut("/")
    public async update(@request() req: express.Request) {
        try {
            return await this._userService.update(req.body as User);
        } catch (error) {
            throw error;
        }
    }

    @httpDelete("/:id")
    public async delete(@requestParam() id: string) {
        try {
            const result = await this._userService.delete(id);
            if (result) {
                return { isDeleted: true };
            }
        } catch (error) {
            throw error;
        }
    }
}