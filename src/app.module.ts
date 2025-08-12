import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import databaseConfig from "./common/config/database.config";
import {NotificationsModule} from "./modules/notifications/notifications.module";

@Module({
  imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig]
		}), NotificationsModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
