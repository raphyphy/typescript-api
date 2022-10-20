import {
    Model, Schema, model, Document
  } from 'mongoose';
  
  export interface IReaction extends Document {
    type: string;
    postId: string;
    userId: string;
    commentText: string;
    read: boolean;
  }
  
  interface IReactionModel extends Model<IReaction> { }
  
  const schema = new Schema<IReaction>({
    postId: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    read: { type: Boolean, required: true },
    type: { type: String, required: true },
    commentText: { type: String }
  }, { timestamps: true });
  
  const Reaction: IReactionModel = model<IReaction, IReactionModel>('Reaction', schema);
  
  export default Reaction;
  