const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

// pour lire les post dans postman t'es obliger de log un utilisateur pour pas que ca bug
module.exports.readPost = async (req, res) => {
    try {
      const post = await PostModel.find();
      res.status(200).json({post});
      return;
     
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
   
  };
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        videoId: req.body.videoId,
        likers: [],
        comments: []
    });
    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    }
    catch (err) {
        res.status(500).json('ca marche pas')
    }
}
module.exports.updatePost = (req, res) => {

}
module.exports.deletePost = (req, res) => {

}