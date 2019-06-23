import "reflect-metadata";
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { bindings } from './di_container';
import * as bodyParser from 'body-parser';

(async () => {
    const port = 3000;
    const container = new Container();
    await container.loadAsync(bindings);

    const server = new InversifyExpressServer(container, null, { rootPath: '/api' });
    server.setConfig((app) => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    })
    const app = server.build();

    app.listen(port, () => {
        console.log(`Server is started at port: ${port}`);
    });
})();
