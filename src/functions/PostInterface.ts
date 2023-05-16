import { publisher } from '../redis/cache';
import { getCache, setCache, deleteCache } from '../redis/interface';
import {
  createPost,
  getPostById,
  updatePost,
  deletePost
} from '../mongo/methods/Posts';
import { IPost } from '../mongo/models/Post';

export async function getPostHelper(postId: string): Promise<IPost | null> {
  const cacheKey = `post:${postId}`;
  const cachedPost: IPost | null = await getCache(cacheKey);

  if (cachedPost) {
    console.log('Post found in cache');
    return cachedPost;
  }

  const post = await getPostById(postId);

  if (post) {
    console.log('Post fetched from MongoDB');
    setCache(cacheKey, post, 60 * 60); // Cache for 1 hour
    return post;
  }

  console.log('Post not found');
  return null;
}

export async function createPostHelper(postData: Partial<IPost>): Promise<IPost | null> {
  const newPost = await createPost(postData);

  if (newPost) {
    console.log('Post created');
    publisher.publish('new-posts', JSON.stringify(newPost));
    return newPost;
  }

  console.log('Post creation failed');
  return null;
}

export async function updatePostHelper(postId: string, postData: Partial<IPost>): Promise<IPost | null> {
  const updatedPost = await updatePost(postId, postData);

  if (updatedPost) {
    console.log('Post updated');
    const cacheKey = `post:${postId}`;
    setCache(cacheKey, updatedPost, 60 * 60); // Cache for 1 hour
    return updatedPost;
  }

  console.log('Post update failed');
  return null;
}

export async function deletePostHelper(postId: string): Promise<boolean> {
  const postObj = await getPostById(postId);
  if (!postObj) {
    console.log('Post not found');
    return false;
  }
  const result = await deletePost(postId);

  if (result) {
    console.log('Post deleted');
    const cacheKey = `post:${postId}`;
    await deleteCache(cacheKey);

    for (const commentId of postObj.commentIds) {
      const commentCacheKey = `comment:${commentId}`;
      await deleteCache(commentCacheKey);
    }

    return true;
  }

  console.log('Post deletion failed');
  return false;
}
