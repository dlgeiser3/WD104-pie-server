require("dotenv").config();
const router = require('express').Router();
const {UserModel} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/register', async (req, res) => {

    let {firstName, lastName, email, password} = req.body;
    
    try {
        const newUser = await UserModel.create({
            firstName, 
            lastName,
            email,
            password: bcrypt.hashSync(password, 13)
        })
        
        const sessionToken = jwt.sign(
            { id: newUser.id}, 
            process.env.JWT_SECRET, 
            { expiresIn: 60*60*24 }
        );
        
        res.status(201).json({
            message: "User registered!",
            user: newUser,
            sessionToken
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message:'Email already in use.'
            });
        } else {
            res.status(500).json({
                error: 'Failed to register user.'
            })
        }
    }
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison) {

                let sessionToken = jwt.sign(
                    {id: loginUser.id}, 
                    process.env.JWT_SECRET, 
                    {expiresIn: 60 * 60 * 24}
                );
    
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }

        } else {
            res.status(401).json({
                message: 'Incorrect email or password'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});              
     
module.exports = router;