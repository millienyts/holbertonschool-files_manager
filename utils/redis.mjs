// utils/redis.mjs

import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err}`);
    });

    this.client.connect().then(() => {
      console.log('Redis client connected to the server');
    }).catch((err) => {
      console.log(`Redis client failed to connect: ${err}`);
    });
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(`Error getting key ${key}:`, err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value);
    } catch (err) {
      console.error(`Error setting key ${key}:`, err);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key}:`, err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
