import express, { Request, Response } from "express";
import {
  createPostHelper,
  deletePostHelper,
  getPostHelper,
  updatePostHelper,
} from "../functions/PostInterface";
import { IPost } from "../mongo/models/Post";
import { getPosts } from "../mongo/methods/Posts";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const allPosts = await getPosts();
  res.status(200).json(allPosts);
});

router.post("/", async (req: Request, res: Response) => {
  const newPostData = req.body as Partial<IPost>;
  const newPost = await createPostHelper(newPostData);
  res.status(200).json(newPost);
});

router.get("/:postId", async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const postObj = await getPostHelper(postId);
  res.status(200).json(postObj);
});

router.put("/:postId", async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const updatedPostData = req.body as Partial<IPost>;
  const updatedPost = await updatePostHelper(postId, updatedPostData);
  res.status(200).json(updatedPost);
});

router.delete("/:postId", async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const deleteResponse = await deletePostHelper(postId);
  res.status(200).json(deleteResponse);
});

export default router;
