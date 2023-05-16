import faker from "faker";
import { createUserHelper } from "./functions/UserInterface";
import { createPostHelper } from "./functions/PostInterface";
import { createCommentHelper } from "./functions/CommentInterface";
import mongoose from "mongoose";

const NUM_USERS = 50;
const POSTS_PER_USER = 25;
const COMMENTS_PER_POST = 3;

require('dotenv').config();


async function seed() {
  // Seed Users
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const userData = {
      name: faker.name.findName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      dateOfBirth: faker.date.past(30, new Date(2003, 0, 1)),
      friends: [],
    };
    const newUser = await createUserHelper(userData);
    if (newUser) {
      users.push(newUser);
    }
  }

  // Seed Posts, Comments 
  for (const user of users) {
    for (let j = 0; j < POSTS_PER_USER; j++) {
      // Seed Posts
      const postData = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        author: user._id,
        createdAt: faker.date.recent(30),
        likes: faker.datatype.number(100),
        comments: 0,
        commentIds: [],
      };
      const newPost = await createPostHelper(postData);
      if (!newPost) {
        continue;
      }

      // Seed Comments
      const comments = [];
      for (let k = 0; k < COMMENTS_PER_POST; k++) {
        const commentData = {
          content: faker.lorem.sentences(),
          author: users[faker.datatype.number(NUM_USERS - 1)]._id,
          postId: newPost._id,
          createdAt: faker.date.between(newPost.createdAt, new Date()),
          likes: faker.datatype.number(50),
        };
        const newComment = await createCommentHelper(commentData);
        if (newComment) {
          comments.push(newComment);
        }
      }
    }
  }
}

mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.DB_CONTAINER_NAME ? process.env.DB_CONTAINER_NAME : "localhost"}:27017`).then(() => {
  console.log("Seed running")
  seed().then(() => {
    console.log("Seeding completed.");
    process.exit(0);
  });
}).catch((error) => {
  console.log("Error connecting",error)
});
