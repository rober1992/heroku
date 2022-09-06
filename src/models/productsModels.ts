import mongoose from "mongoose";

const productsCollection = 'products';

const ProductsSchema = new mongoose.Schema({
    name : {type : String, require : true, max : 50},
    price : {type : Number, require : true},
    description : {type : String, require : true, max : 240} ,
    thumbnail : {type : String, require : true, max : 64},
    stock : {type : Number, require : true},
    timestamp : {type : Date, default : Date.now()}
});

export const productos = mongoose.model(productsCollection, ProductsSchema);