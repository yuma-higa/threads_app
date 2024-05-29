import mongoose from "mongoose";
import { number } from "zod";

const threadSchema = new mongoose.Schema({
    text: { type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type: String
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    likesCount:{
        type:Number,
        default: 0
    }
   
});

threadSchema.pre('save', function(next) {
    this.likesCount = this.likes.length;
    next();
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;

