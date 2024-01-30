import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  text: { type: String, minlength: 2, required: true },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
  },
});

commentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model('Comment', commentSchema);
