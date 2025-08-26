import {DatabaseModule} from "../database/database.module";
import {Module} from "@nestjs/common";
import {notificationProviders} from "./notifications.providers";
import {NotificationsController} from "./notifications.controller";
import {NotificationsService} from "./notifications.service";
import {NotificationProducer} from "./producers/notification.producer";
import {ClientsModule, RmqOptions} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {CacheModule} from "@nestjs/cache-manager";
import {RedisStore} from "cache-manager-redis-store";

@Module({
	imports: [DatabaseModule, ClientsModule.registerAsync([
		{
			name: "NOTIFICATIONS_SERVICE",
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({...configService.get<RmqOptions>("rabbitmq")}),
		}
	]),
		CacheModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({...configService.get<() => Promise<RedisStore>>("redis")})
		})
	],
	controllers: [NotificationsController],
	providers: [NotificationsService, ...notificationProviders, NotificationProducer],
	exports: []
})

export class NotificationsModule {}