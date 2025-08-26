import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {MicroserviceOptions, RmqOptions, RedisOptions} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
	const PORT = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);

	app.useGlobalPipes(new ValidationPipe());

	const rmqConfig = config.get<RmqOptions>("rabbitmq")
	const redisConfig = config.get<RedisOptions>("redis");

	if(!rmqConfig) throw new Error("Missing rabbitmq configuration");
	if(!redisConfig) throw new Error("Missing redis configuration");

	app.connectMicroservice<MicroserviceOptions>(rmqConfig);
	app.connectMicroservice<MicroserviceOptions>(redisConfig);

	await app.startAllMicroservices();
  await app.listen(PORT);
	console.log(`Server started on port: ${PORT}: http://localhost:${PORT}`);
}

bootstrap();
