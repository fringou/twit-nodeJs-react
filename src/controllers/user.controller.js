const UserModel = require('../models/user.model')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) throw Error('User not found');
   return res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.updateUser = async (req, res) => {
  const { pseudo, email, password } = req.body;
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { bio: req.body.bio } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
  );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) throw Error('User not found');

    const removedUser = await user.remove();
    res.status(200).json({ message: 'User deleted successfully', id: removedUser._id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.follow = async (req, res) => {
  const { userId } = req.params;
  const { followerId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    const follower = await UserModel.findById(followerId);

    if (!user || !follower) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.followers.includes(followerId) || follower.following.includes(userId)) {
      return res.status(400).json({ error: 'Already following' });
    }

    await user.updateOne({ $push: { followers: followerId } });
    await follower.updateOne({ $push: { following: userId } });

    res.status(200).json({ message: 'Follow successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unfollow = async (req, res) => {
  const { userId } = req.params;
  const { followerId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    const follower = await UserModel.findById(followerId);

    if (!user || !follower) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.followers.includes(followerId) || !follower.following.includes(userId)) {
      return res.status(400).json({ error: 'Not following' });
    }

    await user.updateOne({ $pull: { followers: followerId } });
    await follower.updateOne({ $pull: { following: userId } });

    res.status(200).json({ message: 'Unfollow successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.like = async (req, res) => {
  const { userId } = req.params;
  const { postId } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.likes.includes(postId)) {
      return res.status(400).json({ error: 'Already liked' });
    }

    await user.updateOne({ $push: { likes: postId } });

    res.status(200).json({ message: 'Like successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unlike = async (req, res) => {
  const { userId } = req.params;
  const { postId } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.likes.includes(postId)) {
      return res.status(400).json({ error: 'Not liked' });
    }

    await user.updateOne({ $pull: { likes: postId } });

    res.status(200).json({ message: 'Unlike successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
