async function routes(fastify, { _db: db }) {

    fastify.get('/exp/:col/data/:date', async function (req, res) {
        try {
            const { col, date } = req.params;
            const all = await db.collection(col).find({ cycle: date.replaceAll("-", "/") }).toArray();
            return res.send(all || []);
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch data', details: err.message });
        }
    });

    fastify.get('/exp/:col/data', async function (req, res) {
        try {
            const { col } = req.params;
            const all = await db.collection(col).find({}).toArray();
            return res.send(all || []);
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch data', details: err.message });
        }
    });

    fastify.put('/exp/:col/data', async function (req, res) {
        try {
            const { col } = req.params;
            const { cycle, budget, overview } = req.body;
            const all = await db.collection(col).updateOne({ cycle }, { $set: { budget, overview } }, { upsert: true });
            return res.send(all || []);
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch data', details: err.message });
        }
    });
}

export default routes;