import { IComment } from "../mongo/models/Comment";
import { IPost } from "../mongo/models/Post";
import { subscriber } from "./cache";

const handleNewEvent = (channel: string, message: string) => {
  switch (channel) {
    case 'new-posts': {
      const post: IPost = JSON.parse(message);
      // Process the new post event, such as sending real-time notifications to users
      console.log('New post:', post);
      break;
    }
    case 'new-comments': {
      const comment: IComment = JSON.parse(message);
      // Process the new comment event, such as sending real-time notifications to users
      console.log('New comment:', comment);
      break;
    }
    default:
      console.log('Unhandled channel:', channel);
  }
};

subscriber.on('message', (channel, message) => {
    handleNewEvent(channel, message)
});
subscriber.subscribe('new-posts', 'new-comments');
