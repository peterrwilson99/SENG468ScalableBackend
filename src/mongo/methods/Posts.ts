import Comment from "../models/Comment";
import post, { IPost } from "../models/Post";

export async function createPost(postData: Partial<IPost>): Promise<IPost | null> {
  try {
    const postObj = new post(postData);
    await postObj.save();
    return postObj;
  } catch (error) {
    console.error(`Error creating post in MongoDB: ${error}`);
    return null;
  }
}

export async function getPostById(postId: string): Promise<IPost | null> {
  try {
    const postObj = await post
      .findById(postId)
      .populate({ path: "commentIds", model: "Comment" });
    return postObj;
  } catch (error) {
    console.error(`Error fetching post from MongoDB: ${error}`);
    return null;
  }
}

export async function updatePost(postId: string, postData: Partial<IPost>): Promise<IPost | null> {
  try {
    const postObj = await post.findByIdAndUpdate(postId, postData, { new: true });
    return postObj;
  } catch (error) {
    console.error(`Error updating post in MongoDB: ${error}`);
    return null;
  }
}

export async function deletePost(postId: string): Promise<boolean> {
  try {
    const postObj = await post.findById(postId);
    if (!postObj) {
      console.error(`Post not found: ${postId}`);
      return false;
    }

    // Delete related comments
    await Comment.deleteMany({ _id: { $in: postObj.commentIds } });

    // Delete the post
    await post.findByIdAndDelete(postId);

    return true;
  } catch (error) {
    console.error(`Error deleting post from MongoDB: ${error}`);
    return false;
  }
}

export async function getPosts(): Promise<IPost[] | null> {
  try {
    const postObjects = await post.find();
    return postObjects;
  } catch (error) {
    console.error(`Error getting users from MongoDB: ${error}`);
    return null;
  }
}

