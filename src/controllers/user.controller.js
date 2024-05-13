const User = require('../models/User.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const RegisterUser = async (req,res)=>{
    try {

        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
        
    } catch (error) {
        res.status(501).json('Server error.......')
    }
}

const LoginUser = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    
}