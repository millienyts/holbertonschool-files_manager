import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.error('Redis Client Error:', err));
    this.client.connect();
  }

  isAlive() {
    return this.client.isReady;
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });
    } catch (err) {
      console.error(err);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;

