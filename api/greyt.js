async function routes(fastify, { _db: db }) {

    fastify.get('/greyt/data', async function (req, res) {
        try {
            const all = await db.collection('att_end').find({}).sort({ _id: -1 }).limit(15).toArray();
            return res.send(all || []);
        } catch (err) {
            res.code(500).send({ error: 'Failed to fetch data', details: err.message });
        }
    });
}

export default routes;