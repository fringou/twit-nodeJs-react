const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');

const maxAge = '24h';
const tokenSecret = process.env.TOKEN_SECRET || 'default_secret_key'; // ajout d'une clé secrète par défaut

const createToken = (id) => {
    return jwt.sign({ id: id }, tokenSecret, { expiresIn: '1d' });
};

module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body
    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id })
    }
    catch (err) {
        res.status(400).send({ err })
    }
};
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.login(email, password);
    const token = createToken(user._id); // Assurez-vous que l'ID est une chaîne de caractères
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    console.log(token);
      res.status(200).json({ user: user._id });
    } catch (err) {
      res.status(400).json({ error: err.message });
      
    }
   
  };
module.exports.logout = async (req, res) => {}
