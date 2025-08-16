import {Injectable} from "@nestjs/common";
import {
	Ctx, EventPattern,
	Payload,
	RmqContext,
} from "@nestjs/microservices";
import * as messageInterface from "../interfaces/message.interface";
import {NotificationMessage, NotificationStatus} from "../interfaces/notification.interface";
import {NotificationsService} from "../notifications.service";

@Injectable()
export class NotificationConsumer {
	constructor(
		private readonly notificationService: NotificationsService
	) {}

	@EventPattern(NotificationMessage.MESSAGE)
	async getNotifications(@Payload() data: messageInterface.Message, @Ctx() ctx: RmqContext): Promise<void> {
		const {notificationId, type, recipient} = data;

		console.log("Received message", data, ctx);

		const wasUpdateNotification = this.notificationService.changeNotificationStatus(notificationId, NotificationStatus.QUEUED);

		if (!wasUpdateNotification) {
			// temporarily
			console.error("Notification wasn't update status");
		}

		console.log(`New notification ${type} from ${recipient}`);
	}
}