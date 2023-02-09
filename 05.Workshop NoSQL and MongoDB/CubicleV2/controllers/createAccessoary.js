module.exports = {
    createAcc(req,res){
        res.render('createAccessory', {title: 'Create Accessory'})
    },
    async createAccPost(req,res){
        const acc = {
            "name": req.body.name,
            "description": req.body.description,
            "imageUrl": req.body.imageUrl,
            "difficulty": req.body.difficulty,
            // "cubes": req.params.id
        }
        try{
            await req.storage.createAcc(acc)
        }catch(err){
            return res.render('createAccessory', {title: 'Create Accessory', error: err.name})
        }

        res.redirect('/')
    }
}