import mongoose from "mongoose";
const problemschema=new mongoose.Schema({
   user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links the problem to a specific user
        required: true
   },
   tags:{
    type:[String] //dp//sliding window
   },
   title:{
        type:String
   },
logs: {
    type: [String],
    enum: ['TLE', 'MLE', 'Integer Overflow', 'Logic Error', 'Corner Case Fail', 'Off-By-One'],
    default: []
},
   description:{
    type:String
   },
  
   level:{
    type:String
   },
   status:{//struggling//mastered
    type:String
   },
   link:{
    type:String,
   },
   masteryLevel: { 
        type: Number, 
        default: 0 
    },
    nextReviewDate: {
  type: Date,
  default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
}

},{
   timestamps:true
});
const Problem=mongoose.model("Problem",problemschema);
export default Problem;
