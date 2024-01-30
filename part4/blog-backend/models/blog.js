import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model('Blog', blogSchema);
