module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const cube = await req.storage.getById(id);
        if (!cube) {
            return res.redirect('/404');
        }
        const ctx = {
            title: 'Details',
            cube,
            accessories: cube.accessories
        };
        res.render('details', ctx);
    },
};
