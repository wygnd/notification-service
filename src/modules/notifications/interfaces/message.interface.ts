import {NotificationType} from "./notification.interface";

export interface Message {
	notificationId: string;
	type: NotificationType;
	recipient: string;
}