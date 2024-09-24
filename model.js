const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username: {
        type: String,
        require: true
    }
});

const exerciseSchema=new Schema({
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
        require: false
    },
    userId: {
        type: Schema.ObjectId,
        require: true,
        ref: "users"
    }
});

const userModel=mongoose.model("user", userSchema);
const exerciseModel=mongoose.model("exercise", exerciseSchema);

module.exports={
    userModel,
    exerciseModel
}