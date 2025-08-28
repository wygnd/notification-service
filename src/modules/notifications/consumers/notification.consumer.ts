import {Injectable} from "@nestjs/common";
import {
	EventPattern,
	Payload,
} from "@nestjs/microservices";
import * as messageInterface from "../interfaces/message.interface";

@Injectable()
export class NotificationConsumer {
	constructor() {}

	@EventPattern('create_notification')
	async getNotifications(@Payload() data: messageInterface.Message) {
		const {type, recipient} = data;

		console.log(`New notification ${type} from ${recipient}`);
	}
}