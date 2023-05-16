import { createClient } from 'redis';

const redisUrl = `redis://${process.env.CACHE_CONTAINER_NAME ? process.env.CACHE_CONTAINER_NAME : "localhost"}:6379`

export const redisClient = createClient({url: redisUrl});
export const publisher = createClient({url: redisUrl});
export const subscriber = createClient({url: redisUrl});

export const connectRedis = () => {
  redisClient.connect().then((val) => {
    console.log("Redis Connected")
  }).catch((error) => {
    console.log("error connecting redisClient", error)
  });
}

export const connectPublisher = () => {
  publisher.connect().then((val) => {
    console.log("Publisher Connected")
  }).catch((error) => {
    console.log("error connecting publisher", error)
  });
}
export const connectSubscriber = () => {
  subscriber.connect().then((val) => {
    console.log("Subscriber Connected")
  }).catch((error) => {
    console.log("error connecting Subscriber", error)
  });
}

redisClient.on('error', err => console.log('Redis Client Error', err));

