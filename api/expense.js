async function routes(fastify, { _db: db }) {

    fastify.get('/:db/data', async function (req, res) {
        try {
            const { db } = req.params;
            const all = await db.collection(db).find({}).toArray();
            return res.send(all || []);
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch data', details: err.message });
        }
    });

    fastify.put('/:db/data', async function (req, res) {
        try {
            const { db } = req.params;
            const { cycle, budget } = req.body;
            const all = await db.collection(db).updateOne({ cycle }, { $set: { budget } }, { upsert: true });
            return res.send(all || []);
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch data', details: err.message });
        }
    });
}

export default routes;