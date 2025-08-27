import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import databaseConfig from "./common/config/database.config";
import {NotificationsModule} from "./modules/notifications/notifications.module";
import rabbitmqConfig from "./common/config/rabbitmq.config";
import redisConfig from "./common/config/redis.config";
import {AppController} from "./app.controller";

@Module({
  imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig, rabbitmqConfig, redisConfig]
		}), NotificationsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
