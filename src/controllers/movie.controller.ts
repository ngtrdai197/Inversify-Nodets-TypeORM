import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpDelete } from "inversify-express-utils";
import { Repository } from "typeorm";
import { Movie } from "../entities/movie";
import { TYPE } from "../constants/types";

@controller("/v1/movies")
export class MovieController {
    private readonly _movieRepository: Repository<Movie>;
    public constructor(
        @inject(TYPE.MovieRepository) movieRepository: Repository<Movie>
    ) {
        this._movieRepository = movieRepository;
    }
    @httpGet("/")
    public async get(res: Response) {
        try {
            return await this._movieRepository.find();
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpGet("/:year")
    public async getByYear(req: Request, res: Response) {
        try {
            const year = parseInt(req.params.year);
            return await this._movieRepository.find({ year });
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpPost("/")
    public async post(req: Request, res: Response) {
        if (!(typeof req.body.title === "string") || isNaN(req.body.year)) {
            res.status(400);
            res.send(`Invalid Movie!`);
        }
        try {
            return await this._movieRepository.save(req.body);
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpDelete('/:id')
    public async delete(req: Request, res: Response) {
        try {
            const result = await this._movieRepository.createQueryBuilder().select("movies").from(Movie, "movies")
                .where(`movies.id = ${req.params.id}`).delete;
            if (result) {
                return { deleted: true }
            }
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}