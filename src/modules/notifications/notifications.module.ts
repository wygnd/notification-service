import {DatabaseModule} from "../database/database.module";
import {Module} from "@nestjs/common";
import {notificationProviders} from "./notifications.providers";
import {NotificationsController} from "./notifications.controller";
import {NotificationsService} from "./notifications.service";

@Module({
	imports: [DatabaseModule],
	controllers: [NotificationsController],
	providers: [NotificationsService, ...notificationProviders],
	exports: []
})

export class NotificationsModule {}