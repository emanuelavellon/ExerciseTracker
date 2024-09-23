const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username: {
        type: String,
        require: true
    }
});

const exerciseSchema=new Schema({
    username: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
});

const userModel=mongoose.model("user", userSchema);
const exerceseModel=mongoose.model("exercise", exerciseSchema);

module.exports={
    userModel,
    exerceseModel
}