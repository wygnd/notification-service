import {NotificationModel} from "./entity/notification.entity";

export const notificationProviders = [{provide: "NotificationRepository", useValue: NotificationModel}]