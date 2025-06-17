// backend/controller/authController.js

// imports
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const { registerSchema, loginSchema } = require('../validators/authValidator');


exports.register = async (req, res) => {

    // Validation des champs requis
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const {email, password} = req.body;

    try {
        //verifier si l'user existe
        const userExist = await User.findOne({email});
        if(userExist)
            return res.status(400).json({message: 'User already exist !'});

        //hasher le mdp
        const hashpwd = await bcrypt.hash(password, 10);

        //créer l'user 
        const newUser = new User({email, password: hashpwd});
        await newUser.save();

        res.status(201).json({message:'User successfully registered !'});
    }
    catch (error){
        res.status(500).json({message:'Server error : ', error: error.message})
    }
};

exports.login = async (req, res) => {

  // Validation des champs requis
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    //trouver l'user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Incorect email' });

    //pwd hashé vs non hashé
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Incorrect password' });

    // Créer le token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error : ', error: error.message });
  }
};