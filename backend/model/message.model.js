import mongoose from "Mongoose"

const messageSchema=new mongoose.Schema(
    {
        conversationId:{
            type:String,
            required:true,
        },
        message:{
            type:String,
            required:true,
        },
        responseBy:{
            type:String,
            enum: ["human","agent"],
            required:true,
        },
    },
    {
        timestamps:true,
    }
)
const Message=mongoose.model("Message",messageSchema);
export default Message;