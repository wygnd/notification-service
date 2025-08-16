import {Message} from "../interfaces/message.interface";
import {Notification, NotificationType} from "../interfaces/notification.interface";

export class SendMessageNotificationDto implements Message{
	readonly notificationId: string;
	readonly type: NotificationType;
	readonly recipient: string;

	constructor(notification: Notification) {
		this.notificationId = notification.notificationId
		this.type = notification.type;
		this.recipient = notification.recipient;
	}
}