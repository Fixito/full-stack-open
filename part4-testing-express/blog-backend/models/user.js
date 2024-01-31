import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
  name: String,
  username: { type: String, unique: true, minlength: 3, required: true },
  passwordHash: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);

export default model('User', userSchema);
