module.exports = {
    async attach(req, res) {
        try{
        const cube = await req.storage.getById(req.params.id);
        const accessories = await req.storage.getAllAccessories(cube.accessories.map(a => a._id))
        res.render('attachAccessory', { title: 'Attach', cube, accessories });
        }catch(err){
            console.log(err);
        }
    },

    async attachPost(req, res){
        const accessoryId = req.body.accessory
        const cubeId = req.params.id

        try{
            await req.storage.attachAccessory(cubeId, accessoryId)
            res.redirect(`/details/${cubeId}`)
        }catch(err){
            res.redirect('/404')
            return console.log(err);

        }
    }
};
