import comment, { IComment } from "../models/Comment";
import Post from "../models/Post";

export async function createComment(commentData: Partial<IComment>): Promise<IComment | null> {
  try {
    const commentObj = new comment(commentData);
    await commentObj.save();

    // Update the related post
    await Post.findByIdAndUpdate(
      commentObj.postId,
      {
        $inc: { comments: 1 },
        $push: { commentIds: commentObj._id },
      },
      { new: true }
    );

    return commentObj;
  } catch (error) {
    console.error(`Error creating comment in MongoDB: ${error}`);
    return null;
  }
}

export async function getCommentById(commentId: string): Promise<IComment | null> {
  try {
    const commentObj = await comment.findById(commentId);
    return commentObj;
  } catch (error) {
    console.error(`Error fetching comment from MongoDB: ${error}`);
    return null;
  }
}

export async function updateComment(commentId: string, commentData: Partial<IComment>): Promise<IComment | null> {
  try {
    const commentObj = await comment.findByIdAndUpdate(commentId, commentData, { new: true });
    return commentObj;
  } catch (error) {
    console.error(`Error updating comment in MongoDB: ${error}`);
    return null;
  }
}

export async function deleteComment(commentId: string): Promise<boolean> {
  try {
    const commentObj = await comment.findById(commentId);
    if (!commentObj) {
      console.error(`Comment not found: ${commentId}`);
      return false;
    }

    await comment.findByIdAndDelete(commentId);

    await Post.findByIdAndUpdate(
      commentObj.postId,
      {
        $inc: { comments: -1 },
        $pull: { commentIds: commentId },
      },
      { new: true }
    );

    return true;
  } catch (error) {
    console.error(`Error deleting comment from MongoDB: ${error}`);
    return false;
  }
}

export async function getComments(): Promise<IComment[] | null> {
  try {
    const commentObjects = await comment.find();
    return commentObjects;
  } catch (error) {
    console.error(`Error getting users from MongoDB: ${error}`);
    return null;
  }
}
