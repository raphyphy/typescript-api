import {
    Model, Schema, model, Document
  } from 'mongoose';
  
  export interface IUser extends Document {
    username: string;
    name: string;
  }
  
  interface IUserModel extends Model<IUser> { }
  
  const schema = new Schema<IUser>({
    username: { type: String, required: true, index: true },
    name: { type: String }
  }, { timestamps: true });
  
  const User: IUserModel = model<IUser, IUserModel>('User', schema);
  
  export default User;
  