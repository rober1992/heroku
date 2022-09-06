import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userCollection = 'users';

const UserSchema = new mongoose.Schema({
    email : {type : String, require : true},
    username : {type : String, require : true},
    password : {type : String, require : true}
});


UserSchema.pre('save',  async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
  
    this.password = hash;
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  };
  
  export const UserModel = mongoose.model('user', UserSchema);
