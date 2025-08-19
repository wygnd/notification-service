import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {Message} from "../interfaces/message.interface";
import {NotificationMessage} from "../interfaces/notification.interface";


@Injectable()
export class NotificationProducer {

	constructor(
		@Inject("NOTIFICATIONS_SERVICE")
		private readonly client: ClientProxy
	) {}

	async sendMessage(pattern: string, data: Message) {
		await this.client.emit('create_notification', data);
	}

}