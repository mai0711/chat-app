const chatRoom = require("../models/chatroom");

//add message in chat room
const addMessage = async(req, res, next) => {
    try{
        const{ from, to, message } = req.body;
        const data = await chatRoom.create({
            message:{ text: message },
            users: [from, to],
            sender: from,
        });
        if(data) return res.json({ message: "Message added successfully." });
        return res.json({ message: "Failed to add message to the database." });
    }catch(ex){
        next(ex);
    }
};

//get message in chat room
const getAllMessages = async(req, res, next) => {
    try{
        const { from, to } = req.body;
        const messages = await chatRoom.find({
            users: {
                $all: [from, to],
            },
        })
        .sort({ updatedAt: 1 });
        const projectMessages = messages.map((msg) => {
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectMessages);
    }catch(ex){
        next(ex);
    }
};
module.exports = { addMessage, getAllMessages };