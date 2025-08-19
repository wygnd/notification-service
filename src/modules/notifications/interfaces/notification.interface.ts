
export enum NotificationType {
	EMAIL = "email",
	SMS = "sms",
	PUSH = "push",
	WEBHOOK = "{webhook}",
	IN_APP = "in_app"
}

export enum NotificationStatus {
	PENDING = "pending",
	QUEUED = "queued",
	PROCESSING = "processing",
	SENT = "sent",
	RETRYING = "retrying",
	FAILED = "failed",
	CANCELLED = "cancelled"
}

export interface Notification {
	notificationId: string;
	type: NotificationType;
	recipient: string;
	message: string;
	status: NotificationStatus;
	payload?: any
	attempts: number;
	maxAttempts: number;
	lastError?: string;
	scheduledAt?: Date;
	nextRetryAt?: Date
	sentAt?: Date;
	deliveredAt?: Date;
	priority: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export enum NotificationMessage {
	MESSAGE = "message",
	CREATE_NOTIFICATION = "create_notification"
}
