const Users = require("../models/users");
const { hashPassword } = require('../helpers/userHelper');

//Register
const registerUser = async(req, res, next) => {
    try{
        const { username, email, password } = req.body;

        const usernameCheck = await Users.findOne({ username });
        if(usernameCheck)
        return res.json({message:"Username is already used", status: false});

        const emailCheck = await Users.findOne({ email });
        if(emailCheck)
        return res.json({message:"Email is already used", status: false});

        const hashedPassword = await hashPassword(password);
        const user = await Users.create({
            username,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status:true, user });
    }catch(ex){
        next(ex);
    }
};

//Login
const loginUser = async(req, res, next) => {
    try{
        const { username, password } = req.body;

        const user = await Users.findOne({ username });
        if(!user)
        return res.json({message:"Incorrect username or password", status: false});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid)
        return res.json({message:"Incorrect username or password", status: false});

        delete user.password;
        return res.json({ status:true, user });
    }catch(ex){
        next(ex);
    }
};

//avatar
const setAvatar = async(req, res, next) => {
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await Users.findByIdAndUpdate(userId,{
            isAvatarImageSet: true,
            avatarImage,
        },);
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage,
        })
    }catch(ex){
        next(ex);
    }
};

//all users
const getAllUsers = async(req, res, next) => {
    try {
        const users = await Users.find({ _id: { $ne: req.params.id } }).select([
            "username",
            "email",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
};

module.exports = { registerUser, loginUser, setAvatar, getAllUsers };