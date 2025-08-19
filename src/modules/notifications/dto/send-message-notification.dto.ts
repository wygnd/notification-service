import {Message} from "../interfaces/message.interface";
import {Notification, NotificationType} from "../interfaces/notification.interface";
import {NotificationModel} from "../entities/notification.entity";
import {NotificationDto} from "./notification.dto";

export class SendMessageNotificationDto implements Message{
	notificationId: string;
	type: NotificationType;
	recipient: string;

	constructor(notification: NotificationDto) {
		this.notificationId = notification.notificationId;
		this.type = notification.type;
		this.recipient = notification.recipient;
	}
}