import mongoose from "mongoose";

const conversationSchema =new mongoose.Schema({
    conversationId:{
        type:String,
        required:true,
        unique:true,
    },
    resumeFile:{
        type:String,
    },
    resumeText:{
        type:String,
    }
    
},{
    timestamps:true,
});
const Conversation =mongoose.model("Conversation",conversationSchema);
export default Conversation