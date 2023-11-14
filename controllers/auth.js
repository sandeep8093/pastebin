const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



exports.signup = async (req, res) => {
  let { email, password,username  } = req.body;
  try{
    const user = await User.findOne({ email });
    if(user){
     return res.status(401).json("User with this email already exists");
    }
    const newUser = new User({
      email: email,
      username:username,
      password: bcrypt.hashSync(password, 10),
    });
    const savedUser = await newUser.save();
    console.log("new user created")
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
}

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const payload = {
        id: user.id,
        email: user.email,
        isAdmin : user.isAdmin
    };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.signout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'signout successfully' });
};

