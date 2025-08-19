import {NotificationStatus, NotificationType} from "../interfaces/notification.interface";
import {NotificationModel} from "../entities/notification.entity";

export class NotificationDto {
	public notificationId: string;
	public type: NotificationType;
	public recipient: string;
	public message: string;
	public payload?: any;
	public attempts: number;
	public maxAttempts: number;
	public lastError?: string;
	public nextRetryAt?: Date;
	public sentAt?: Date;
	public deliveredAt?: Date;
	public priority: number;
	public status: NotificationStatus;

	constructor(notification: NotificationModel) {
		this.notificationId = notification.getDataValue("notificationId");
		this.type = notification.getDataValue("type");
		this.recipient = notification.getDataValue("recipient");
		this.message = notification.getDataValue("message");
		this.payload = notification.getDataValue("payload");
		this.attempts = notification.getDataValue("attempts");
		this.maxAttempts = notification.getDataValue("maxAttempts");
		this.lastError = notification.getDataValue("lastError");
		this.nextRetryAt = notification.getDataValue("nextRetryAt");
		this.sentAt = notification.getDataValue("sentAt");
		this.deliveredAt = notification.getDataValue("deliveredAt");
		this.priority = notification.getDataValue("priority");
		this.status = notification.getDataValue("status");
	}
}