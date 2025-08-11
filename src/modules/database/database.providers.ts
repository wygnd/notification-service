import {Sequelize} from "sequelize-typescript";
import {ConfigService} from "../../common/config/database.config";
import {NotificationModel} from "../notifications/entity/notification.entity";

export const databaseProviders = [
	{
		provide: "SEQUELIZE",
		useFactory: async (configService: ConfigService) => {
			const sequelize = new Sequelize(configService.sequelizeConfig);

			sequelize.addModels([NotificationModel]);
			await sequelize.sync();

			return sequelize;
		},
		inject: [ConfigService],
	}
]