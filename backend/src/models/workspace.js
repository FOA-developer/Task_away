import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema({
  name:{
    type: String,
    required: true,
    maxLength: 300,
    minLength: 3,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    index : true
  },
},
{
  timestamps: true
}
)

export const Workspace = mongoose.model("Workspace", workspaceSchema);