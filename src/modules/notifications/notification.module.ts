import {DatabaseModule} from "../database/database.module";
import {Module} from "@nestjs/common";
import {notificationProviders} from "./notification.proviuders";

@Module({
	imports: [DatabaseModule],
	controllers: [],
	providers: [...notificationProviders],
	exports: []
})

export class NotificationModule {}