import {Sequelize} from "sequelize-typescript";
import {ConfigService} from "@nestjs/config"
import {NotificationModel} from "../notifications/entities/notification.entity";

export const databaseProviders = [
	{
		isGlobal: true,
		provide: "SEQUELIZE",
		useFactory: async (configService: ConfigService) => {
			const sequelize = new Sequelize(configService.get("database"));

			sequelize.addModels([NotificationModel]);
			await sequelize.sync();

			return sequelize;
		},
		inject: [ConfigService],
	}
]