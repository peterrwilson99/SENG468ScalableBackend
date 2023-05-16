import express, { Request, Response } from "express";
import { createUserHelper, deleteUserHelper, getUserHelper, updateUserHelper } from "../functions/UserInterface";
import { IUser } from "../mongo/models/User";
import { getUsers } from "../mongo/methods/Users";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const allUsers = await getUsers();
  res.status(200).json(allUsers);
});

router.post("/", async (req: Request, res: Response) => {
    const newUserData = req.body as Partial<IUser>
    const newUser = await createUserHelper(newUserData)
    res.status(200).json(newUser)
});

router.get("/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userObj = await getUserHelper(userId);
    res.status(200).json(userObj)
});

router.put("/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const updatedUserData = req.body as Partial<IUser>
    const updatedUser = await updateUserHelper(userId, updatedUserData)
    res.status(200).json(updatedUser)
});

router.delete("/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const deleteResponse = await deleteUserHelper(userId);
    res.status(200).json(deleteResponse)
});

export default router;