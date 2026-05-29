import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

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
    maxlength:25,
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
  }
},
{
  timestamps: true
}
)

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);

  next()
})

userSchema.methods.comparePasswords = async function (passowrd) {
  return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User", userSchema);