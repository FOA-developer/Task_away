import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new Schema({
  name:{
    type: String,
    required: true,
    maxlength: 40,
    minlength: 5
  },
  password: {
    type:String,
    required: true,
    minlength: 8,
  },
  email:{
    type:String,
    required:true,
    unique: true,
    validate: {
      validator: function(email) {
        return email.includes('@');
      },
      message: 'Email must contain @'
    },
    lowercase:true,
    trim:true
  },
  currentWorkspace : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace"
  },

},
{
  timestamps: true
}
)

userSchema.pre("save", async function(){
  if(!this.isModified("password"))
  this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User", userSchema);