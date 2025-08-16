import {RmqOptions, Transport} from "@nestjs/microservices";

export default (): {rabbitmq: RmqOptions} => ({
	rabbitmq: {
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RABBITMQ_URL ?? ""],
			queue: process.env.RABBITMQ_QUEUE,
		}
	}
})
