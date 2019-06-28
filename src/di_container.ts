import { AsyncContainerModule } from 'inversify';
import { Repository } from 'typeorm';
import { getDbConnection } from './database';
import { getMovieRepository, getUserRespository } from './repositories';
import { Movie } from './entities/movie';
import { TYPE } from './constants/types';
import { User } from './entities/user';
import { IUserService } from './interfaces/IServices/IUser.service';
import { UserService } from './services/user.service';

export const bindings = new AsyncContainerModule(async (bind) => {
    await getDbConnection();
    await require('./controllers');

    // bind reposirtory

    bind<Repository<Movie>>(TYPE.MovieRepository).toDynamicValue(() => {
        return getMovieRepository();
    }).inRequestScope();

    bind<Repository<User>>(TYPE.UserRepository).toDynamicValue(() => {
        return getUserRespository();
    }).inRequestScope();

    // bind service interface to service
    bind<IUserService>(TYPE.IUserService).to(UserService);
})