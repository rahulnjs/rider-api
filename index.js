import Fastify from 'fastify';
import db from './db.js';
import dotenv from 'dotenv';
import cors from '@fastify/cors';

const argv = process.argv[2];

dotenv.config({ path: argv === 'dev' ? './.env.dev' : './.env' });


db.connect().then((db) => {
    const fastify = Fastify({
        logger: true
    });

    fastify.register(cors);

    fastify.get('/', async function () {
        return { hello: 'world' };
    });

    fastify.register(import('./api/trip.js'), { db });
    fastify.register(import('./api/rider.js'), { db });

    fastify.listen({ port: 3099 }, function (err, address) {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
}).catch(console.error);




