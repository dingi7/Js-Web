module.exports = {
    create(req,res){
        res.render('create', {title: 'Create cube'})
    },
    async createPost(req,res){
        const cube = {
            "name": req.body.name,
            "description": req.body.description,
            "imageUrl": req.body.imageUrl,
            "difficulty": req.body.difficulty
        }

        await req.storage.create(cube)

        res.redirect('/')
    }
}