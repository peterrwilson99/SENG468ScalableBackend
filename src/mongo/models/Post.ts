import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  createdAt: Date;
  likes: number;
  comments: number;
  commentIds: Schema.Types.ObjectId[];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  commentIds: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model<IPost>("Post", PostSchema);
