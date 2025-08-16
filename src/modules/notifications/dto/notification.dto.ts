import {Notification, NotificationStatus, NotificationType} from "../interfaces/notification.interface";

export class NotificationDto {
	readonly notificationId: string;
	readonly type: NotificationType;
	readonly recipient: string;
	readonly message: string;
	readonly payload?: any;
	readonly attempts: number;
	readonly maxAttempts: number;
	readonly lastError?: string;
	readonly nextRetryAt?: Date;
	readonly sentAt?: Date;
	readonly deliveredAt?: Date;
	readonly priority: number;
	readonly status: NotificationStatus;

	constructor(notification: Notification) {
		this.notificationId = notification.notificationId;
		this.type = notification.type;
		this.recipient = notification.recipient;
		this.message = notification.message;
		this.payload = notification?.payload;
		this.attempts = notification.attempts;
		this.maxAttempts = notification.maxAttempts;
		this.lastError = notification?.lastError;
		this.nextRetryAt = notification?.nextRetryAt;
		this.sentAt = notification?.sentAt;
		this.deliveredAt = notification?.deliveredAt;
		this.priority = notification.priority;
		this.status = notification.status;
	}
}