# SENG 468 Assignment 2 - Scalable Social Media Backend

For Assignment 2, the goal was to design a scalable and fault-tolerant social media platform that enables users to create and share posts. The platform needed to handle a large number of concurrent users and support real-time notifications and messaging. To achieve this, a combination of MongoDB, Redis, Nginx Load Balancer, and redis queuing were utilized. The solution included components such as a MongoDB database for storing user, post, comment, and notification information, a Redis cache for improving performance, an Nginx Load Balancer for distributing requests and enhancing availability, and a messaging system using Redis for real-time notifications and user messaging. The project was containerized using Docker, with a provided Docker Compose file for easy setup and deployment. Additionally, scripts were developed to populate the database with sample data for testing, and perform basic CRUD operations on the database.

## What was implemented:
- MongoDB storing
    - Comments
    - Posts
    - Users 
- Redis Cache
- Nginx Load Balancer
- Publisher but no subscriber using redis
- Seed script included at `src/seed.ts` which can be ran with npm run seed
- CRUD operations via express server at http://localhost:80
    - User operations:
        - GET http://localhost:80/user
            - Gets all users
        - POST http://localhost:80/user
            - Posts new user
        - GET http://localhost:80/:userId
            - Gets user
        - PUT http://localhost:80/:userId
            - Edits user
        - DELETE http://localhost:80/:userId
            - Deletes user
    - Post operations:
        - GET http://localhost:80/post
            - Gets all posts
        - POST http://localhost:80/post
            - Posts new post
        - GET http://localhost:80/:postId
            - Gets post
        - PUT http://localhost:80/:postId
            - Edits post
        - DELETE http://localhost:80/:postId
            - Deletes post
    - Comment operations:
        - GET http://localhost:80/comment
            - Gets all comments
        - POST http://localhost:80/comment
            - Posts new comment
        - GET http://localhost:80/:commentId
            - Gets comment
        - PUT http://localhost:80/:commentId
            - Edits comment
        - DELETE http://localhost:80/:commentId
            - Deletes comment


### To run locally
1. Install NodeJS 16
2. Run the following commands
    ```sh
    cd local
    docker-compose up -d
    cd ..
    npm run seed
    npm run dev
    ```

### To run with docker
1. Run the following command
    ```sh
    docker-compose up -d
    ```
