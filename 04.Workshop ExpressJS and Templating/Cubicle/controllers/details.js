module.exports = {
    async details(req,res){
        const id = req.params.id
        const cube = await req.storage.getById(id)
        if(!cube){
            return res.redirect('/404')
        }
        cube["id"] = id
        const ctx = {
            title: "Details",
            cube
        }
        res.render('details', ctx)
    }
}