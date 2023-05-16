import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  friends: Schema.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model<IUser>("User", UserSchema);
