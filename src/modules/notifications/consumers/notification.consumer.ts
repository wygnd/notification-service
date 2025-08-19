import {Injectable} from "@nestjs/common";
import {
	EventPattern,
	Payload,
} from "@nestjs/microservices";
import * as messageInterface from "../interfaces/message.interface";
import {NotificationStatus} from "../interfaces/notification.interface";
import {NotificationsService} from "../notifications.service";

@Injectable()
export class NotificationConsumer {
	constructor() {}

	// @EventPattern('create_notification')
	// async getNotifications(@Payload() data: messageInterface.Message): void {
	// 	const {notificationId, type, recipient} = data;
	//
	// 	console.log("Received message", data);
	//
	// 	const wasUpdateNotification = this.notificationService.changeNotificationStatus(notificationId, NotificationStatus.QUEUED);
	//
	// 	if (!wasUpdateNotification) {
	// 		// temporarily
	// 		console.error("Notification wasn't update status");
	// 	}
	//
	// 	console.log(`New notification ${type} from ${recipient}`);
	// }

	@EventPattern('create_notification')
	async handleEvent(data: any) {
		console.log("Handle event", data)
	}
}