import express, { Request, Response } from "express";
import {
  createCommentHelper,
  deleteCommentHelper,
  getCommentHelper,
  updateCommentHelper,
} from "../functions/CommentInterface";
import { IComment } from "../mongo/models/Comment";
import { getComments } from "../mongo/methods/Comments";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const allComments = await getComments();
  res.status(200).json(allComments);
});

router.post("/", async (req: Request, res: Response) => {
  const newCommentData = req.body as Partial<IComment>;
  const newComment = await createCommentHelper(newCommentData);
  res.status(200).json(newComment);
});

router.get("/:commentId", async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const commentObj = await getCommentHelper(commentId);
  res.status(200).json(commentObj);
});

router.put("/:commentId", async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const updatedCommentData = req.body as Partial<IComment>;
  const updatedComment = await updateCommentHelper(commentId, updatedCommentData);
  res.status(200).json(updatedComment);
});

router.delete("/:commentId", async (req: Request, res: Response) => {
  const commentId = req.params.commentId;
  const deleteResponse = await deleteCommentHelper(commentId);
  res.status(200).json(deleteResponse);
});

export default router;
