import {NotificationModel} from "./entities/notification.entity";

export const notificationProviders = [{provide: "NotificationRepository", useValue: NotificationModel}]