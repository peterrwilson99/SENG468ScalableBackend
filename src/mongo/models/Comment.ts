import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  content: string;
  author: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
  createdAt: Date;
  likes: number;
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, required: true },
  likes: { type: Number, default: 0 },
});

export default mongoose.model<IComment>("Comment", CommentSchema);
