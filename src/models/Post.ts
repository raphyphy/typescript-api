import {
    Model, Schema, model, Document
  } from 'mongoose';
  
  export interface IPost extends Document {
    title: string;
    userId: string;
  }
  
  interface IPostModel extends Model<IPost> { }
  
  const schema = new Schema<IPost>({
    title: { type: String, required: true },
    userId: { type: String }
  }, { timestamps: true });
  
  const Post: IPostModel = model<IPost, IPostModel>('Post', schema);
  
  export default Post;
  