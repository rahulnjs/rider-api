import Fastify from 'fastify';
import DATABASE from './db.js';
import dotenv from 'dotenv';
import cors from '@fastify/cors';

const argv = process.argv[2];

dotenv.config({ path: argv === 'dev' ? './.env.dev' : './.env' });


DATABASE.connect().then((db) => {
    const fastify = Fastify({
        logger: true
    });

    fastify.register(cors);

    fastify.get('/', async function () {
        return { hello: 'world' };
    });

    fastify.register(import('./api/trip.js'), { db });
    fastify.register(import('./api/rider.js'), { db });


    DATABASE.connectRest().then((dbs) => {
        fastify.register(import('./api/greyt.js'), { _db: dbs[1] });
        fastify.register(import('./api/expense.js'), { _db: dbs[0] });
        fastify.listen({ port: 3099 }, function (err, address) {
            if (err) {
                fastify.log.error(err);
                process.exit(1);
            }
        });
    }).catch(console.error);


}).catch(console.error);






