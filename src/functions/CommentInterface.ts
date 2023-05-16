import { publisher } from '../redis/cache';
import { getCache, setCache, deleteCache } from '../redis/interface';
import {
  createComment,
  getCommentById,
  updateComment,
  deleteComment
} from '../mongo/methods/Comments';
import { IComment } from '../mongo/models/Comment';

export async function getCommentHelper(commentId: string): Promise<IComment | null> {
  const cacheKey = `comment:${commentId}`;

  const cachedComment: IComment | null = await getCache(cacheKey);

  if (cachedComment) {
    console.log('Comment found in cache');
    return cachedComment;
  }

  const comment: IComment = await getCommentById(commentId);

  if (comment) {
    console.log('Comment fetched from MongoDB');
    setCache(cacheKey, comment, 60 * 60); // Cache for 1 hour
    return comment;
  }

  console.log('Comment not found');
  return null;
}

export async function createCommentHelper(commentData: Partial<IComment>): Promise<IComment | null> {
  const newComment = await createComment(commentData);

  if (newComment) {
    console.log('Comment created');
    publisher.publish('new-comments', JSON.stringify(newComment));
    return newComment;
  }

  console.log('Comment creation failed');
  return null;
}

export async function updateCommentHelper(commentId: string, commentData: Partial<IComment>): Promise<IComment | null> {
  const updatedComment = await updateComment(commentId, commentData);

  if (updatedComment) {
    console.log('Comment updated');
    const cacheKey = `comment:${commentId}`;
    setCache(cacheKey, updatedComment, 60 * 60); // Cache for 1 hour
    return updatedComment;
  }

  console.log('Comment update failed');
  return null;
}

export async function deleteCommentHelper(commentId: string): Promise<boolean> {
  const result = await deleteComment(commentId);

  if (result) {
    console.log('Comment deleted');
    const cacheKey = `comment:${commentId}`;
    await deleteCache(cacheKey);
    return true;
  }

  console.log('Comment deletion failed');
  return false;
}
