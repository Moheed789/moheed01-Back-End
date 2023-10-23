import mongoose from "mongoose";

const schema =  mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter name"],
    },
    email:{
        type: String,
        required: [true, "Please enter email"],
        unique: true,
    }
});
export const User = mongoose.model("User", schema);