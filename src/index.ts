import express, { json, Request, Response } from 'express';
import { errorHandler } from './middleware/error';
import { NotFoundHandler } from './middleware/notFound';
import connectDB from './mongo/database';
import { connectPublisher, connectRedis, connectSubscriber } from './redis/cache';
import UsersRouter from './routes/users'
import PostsRouter from './routes/posts'
import CommentsRouter from './routes/comments'

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
connectDB();
// connect to Redis
connectRedis();
// connect to Publisher
connectPublisher();
// connect to Subsciber
connectSubscriber();

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json('Server Running');
});

app.use('/user', UsersRouter)
app.use('/post', PostsRouter)
app.use('/comment', CommentsRouter)
app.use(NotFoundHandler);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
