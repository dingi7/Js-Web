module.exports = {
    async edit(req, res) {
        const cube = await req.storage.getById(req.params.id);
        if (!cube) {
            return res.redirect('/404');
        }
        const ctx = {
            title: 'Edit',
            cube,
        };

        res.render('edit', ctx);
    },
    async editPost(req, res) {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: req.body.difficulty,
        };
        await req.storage.edit(req.params.id, cube);

        res.redirect('/details/' + req.params.id);
    },
};
