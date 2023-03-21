const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find()
    res.status(200).json(users);
}
module.exports.userInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        res.status(400).send('Id unknown : ' + req.params.id)

    try {
        const user = await UserModel.findById(req.params.id);
        res.send(user);
    } catch (err) {
        console.log('erreur' + err);
        res.status(500).send('Error retrieving user');
    }
};
module.exports.upDateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        res.status(400).send('Id unknown : ' + req.params.id)
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { bio: req.body.bio } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        );
        res.status(200).json(updatedUser)
    }
    catch (err) {
        console.log('erreur' + err);
        res.status(500).send('Error retrieving user');
    }
};
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        res.status(400).send('Id unknown : ' + req.params.id)
    try {
        const delete_user = await UserModel.findByIdAndDelete(
            { _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" })
    }
    catch (err) {
        console.log('erreur' + err);
        res.status(500).send('Error delete user');
    }
};
module.exports.follow = async (req, res) => {
    try {
        const userToFollow = await UserModel.findById(req.params.id);
        const userFollowing = await UserModel.findById(req.body.following);
        if (!userToFollow || !userFollowing) {
            return res.status(404).send('User not found');
        }
        if (userToFollow.followers.includes(req.body.following) || userFollowing.following.includes(req.params.id)) {
            return res.status(409).send('Already following this user');
        }
        await userToFollow.updateOne({ $push: { followers: req.body.following } });
        await userFollowing.updateOne({ $push: { following: req.params.id } });
        return res.status(201).json({ message: 'Follow successful' });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
module.exports.unfollow = async (req, res) => {
    try {
      const currentUser = await UserModel.findByIdAndUpdate(
        req.body.id,
        // $pull est l'opérateur MongoDB pour supprimer des éléments d'un tableau
        { $pull: { following: req.params.idToUnfollow } },
        { new: true, upsert: true }
      )
  
      const userToUnfollow = await UserModel.findByIdAndUpdate(
        req.params.idToUnfollow,
        { $pull: { followers: req.body.id } },
        { new: true, upsert: true }
      )
  
      res.status(201).json({ currentUser, userToUnfollow });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error unfollowing user');
    }
  };
  module.exports.like = async (req, res) => {
    try {
      const userId = req.params.id;
      const postId = req.body.postId;
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { likes: postId } },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  module.exports.unlike = async (req, res) => {
    try {
      const userId = req.params.id;
      const postId = req.body.postId;
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { likes: postId } },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };