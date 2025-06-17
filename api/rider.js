async function routes(fastify, { db }) {

    fastify.get('/trip/:tripId/rider', async function (req, res) {
        try {
            const { tripId } = req.params;
            const trip = await db.collection('trip').findOne({ _id: new fastify.mongo.ObjectId(tripId) });

            if (!trip) return res.code(404).send({ error: 'Trip not found' });

            return res.send(trip.riders || {});
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch riders', details: err.message });
        }
    });

    fastify.post('/trip/:tripId/rider', async function (req, res) {
        try {
            const { tripId } = req.params;
            const { riderId, riderData } = req.body;

            const updateResult = await db.collection('trip').updateOne(
                { uuid: tripId },
                { $set: { [`riders.${riderId}`]: riderData } }
            );

            if (updateResult.modifiedCount === 0) {
                return res.code(404).send({ error: 'Trip not found or no changes made' });
            }

            return res.send({ message: 'Rider added' });
        } catch (err) {
            res.code(500).send({ error: 'Failed to add rider', details: err.message });
        }
    });

    fastify.put('/trip/:tripId/rider', async function (req, res) {
        try {
            const { tripId } = req.params;
            const { riderId, cLoc, lastUpdated } = req.body;

            if (!riderId || !cLoc || typeof cLoc.lat !== 'number' || typeof cLoc.lng !== 'number') {
                return res.code(400).send({ error: 'Invalid riderId or cLoc format' });
            }

            const updateResult = await db.collection('trip').updateOne(
                { uuid: tripId },
                { $set: { [`riders.${riderId}.cLoc`]: cLoc, [`riders.${riderId}.lastUpdated`]: lastUpdated } }
            );

            if (updateResult.modifiedCount === 0) {
                return res.code(404).send({ error: 'Trip or rider not found, or no update performed' });
            }

            return res.send({ message: 'rider.cLoc updated successfully' });
        } catch (err) {
            res.code(500).send({ error: 'Failed to update cLoc', details: err.message });
        }
    });

}

export default routes;