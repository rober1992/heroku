import mongoose from "mongoose";

const messagesCollection = 'messages';

const MessagesSchema = new mongoose.Schema({
    email : {type : String, require : true, max : 64},
    msg : {type : String, require : true, min : 1},
    timestamp : {type : Date, default : Date.now()}
})

export const mensajes = mongoose.model(messagesCollection, MessagesSchema);