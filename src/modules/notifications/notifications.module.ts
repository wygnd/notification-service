import {DatabaseModule} from "../database/database.module";
import {Module} from "@nestjs/common";
import {notificationProviders} from "./notifications.providers";
import {NotificationsController} from "./notifications.controller";
import {NotificationsService} from "./notifications.service";
import {NotificationConsumer} from "./consumers/notification.consumer";
import {NotificationProducer} from "./producers/notification.producer";
import {ClientsModule, RmqOptions} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

@Module({
	imports: [DatabaseModule, ClientsModule.registerAsync([
		{
			name: "NOTIFICATIONS_SERVICE",
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({...configService.get<RmqOptions>("rabbitmq")}),
		}
	])],
	controllers: [NotificationsController],
	providers: [NotificationsService, ...notificationProviders, NotificationProducer, NotificationConsumer],
	exports: []
})

export class NotificationsModule {}