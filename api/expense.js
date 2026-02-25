async function routes(fastify, { _db: db }) {

    fastify.get('/expense/data', async function (req, res) {
        try {
            const all = await db.collection('expense').find({}).toArray();
            return res.send(all || []);
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch data', details: err.message });
        }
    });

    fastify.put('/expense/data', async function (req, res) {
        try {
            const { cycle, budget } = req.body;
            const all = await db.collection('expense').updateOne({ cycle }, { $set: { budget } }, { upsert: true });
            return res.send(all || []);
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch data', details: err.message });
        }
    });
}

export default routes;