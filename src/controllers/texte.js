const textePostModel = require('../models/texte')

module.exports.allPosts = async (req, res) => {
    try {
       const docs = await textePostModel.find().sort({createdat: -1}).exec();
       return res.status(200).send(docs);
    } catch (err) {
       return res.status(400).send('error to get data: ' + err);
    }
}
module.exports.addPost = async (req, res) => {
    const newTextPost= new textePostModel({
        titre: req.body.titre,
        message: req.body.message,
        author: req.body.author
     
    });
    try {
        await newTextPost.save()
        return res.status(201).json(newTextPost)
    }
    catch (err) {
        return res.status(400).json({ message: err})
    }
}
