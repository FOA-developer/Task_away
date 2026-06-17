import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required : true,
    maxLength: 300,
    minLength: 5,
    },
  description: {
    type: String,
    required: true,
    maxLength: 1000,
    minLength: 10,
  },
  status : {
    type: String,
    enum: ["pending", "inProgress", "completed"],
    default: "pending"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dueDate: {
    type: Date,
    required: true,
  },
  workspace : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required : true
  }
},
{
  timestamps: true
}
)

export const Task = mongoose.model("Task", taskSchema);