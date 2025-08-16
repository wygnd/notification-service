import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {Message} from "../interfaces/message.interface";


@Injectable()
export class NotificationProducer {

	constructor(
		@Inject("NOTIFICATIONS_SERVICE")
		private readonly client: ClientProxy
	) {}

	sendMessage(pattern: string, data: Message) {
		return this.client.emit(pattern, data);
	}

}