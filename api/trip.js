import ShortUniqueId from 'short-unique-id';


async function routes(fastify, { db }) {

    const { randomUUID } = new ShortUniqueId({ length: 8 });

    fastify.get('/trip', async function (req, res) {
        try {
            const trip = await db.collection('trip').find({}).toArray();
            return res.send(trip);
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch trip', details: err.message });
        }
    });

    fastify.get('/trip/:tripId', async function (req, res) {
        try {
            const { tripId } = req.params;
            const trip = await db.collection('trip').findOne({ uuid: tripId });

            if (!trip) return res.code(404).send({ error: 'Trip not found' });

            return res.send(trip);
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch trip', details: err.message });
        }
    });

    fastify.post('/trip', async function (req, res) {
        try {
            const tripData = req.body;
            tripData.uuid = randomUUID();
            const result = await db.collection('trip').insertOne(tripData);
            return res.send({ insertedId: result.insertedId, uuid: tripData.uuid });
        } catch (err) {
            res.code(500).send({ error: 'Failed to create trip', details: err.message });
        }
    });

}

export default routes;