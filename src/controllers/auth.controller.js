const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const maxAge = 86400;
const tokenSecret = process.env.TOKEN_SECRET || 'default_secret_key';

const createToken = (id) => {
    return jwt.sign({ id: id }, tokenSecret, { expiresIn: '1d' });
};

exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body
    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id })
    }
    catch (err) {
        res.status(400).send({ error: err.message  })
    }
};

exports.signIn = (req, res, next) => {
    UserModel.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })     
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    const token = createToken(user._id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge});
                    res.status(200).json({
                        userId: user._id,
                        token: token,
                    });
                })
                .catch(err => res.status(500).json({ error: err.message }));
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};
