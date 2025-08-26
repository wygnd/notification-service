import {RedisStore, redisStore} from "cache-manager-redis-store";

export default (): {redis: () => Promise<RedisStore>} => ({
	redis: async () => await redisStore({
		socket: {
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT
		}
	})
})