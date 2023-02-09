module.exports = {
    async catalog(req, res) {
        const cubes = await req.storage.getAll(req.query);
        const search = req.query.search || '';
        const from = req.query.from || '';
        const to = req.query.to || '';
        const ctx = {
            title: 'Browse cubes',
            cubes,
            search,
            from,
            to,
        };
        res.render('index', ctx);
    },
};
