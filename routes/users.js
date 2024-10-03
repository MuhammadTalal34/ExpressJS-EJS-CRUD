const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Create a new user

router.post('/', async (req, res) => {
    const { name, email } = req.body;
   
    const users = new User({
        name: name,
        email: email
    });

    try {
        await users.save();
        // Redirect to the index route after saving
        res.redirect('/user');
       
    } catch (err) {
        res.status(400).json({ message: err.message });
        
    }
});
// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('index' , {users: users})
        // res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// API route to get users (for client-side fetch)
router.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        if(users){

            res.sendStatus(200).json(users);

        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        if (!users) return res.status(404).json({ message: 'User not found' });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        if (!users) return res.status(404).json({ message: 'User not found' });

        users.name = req.body.name || users.name;
        users.email = req.body.email || users.email;

        const updatedUser = await users.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user by ID
// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        if (!users) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted', users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
