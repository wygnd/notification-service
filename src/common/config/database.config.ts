import {Injectable} from "@nestjs/common";
import {Dialect} from "sequelize"


@Injectable()
export class ConfigService {

	get sequelizeConfig() {
		return config.database;
	}
}

const config = {
	database: {
		dialect: 'postgres' as Dialect,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT && +process.env.DB_PORT || 5432,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	}
}