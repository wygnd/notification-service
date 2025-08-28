import {NotificationStatus, NotificationType} from "../interfaces/notification.interface";
import {IsDateString, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateNotificationDto {
	@ApiProperty({
		example: NotificationType.EMAIL,
		enum: NotificationType,
		type: "string",
	})
	@IsEnum(NotificationType, {message: 'Invalid notification type'})
	type: NotificationType;

	@ApiProperty({
		example: NotificationStatus.PENDING,
		enum: NotificationStatus,
		type: "string"
	})
	@IsOptional()
	@IsEnum(NotificationStatus, {message: 'Invalid notification status'})
	status?: NotificationStatus;

	@ApiProperty({
		example: "user@example.com",
		type: "string"
	})
	@IsNotEmpty({ message: 'Field recipient is required' })
	recipient: string;

	@ApiProperty({
		example: "Добро пожаловать в наше приложение!",
		type: "string"
	})
	@IsOptional()
	@IsString()
	message?: string;

	@ApiProperty({
		example: {
			subject: "Регистрация завершена",
			link: "https://example.com/welcome"
		},
		type: "object",
		additionalProperties: false
	})
	@IsOptional()
	@IsObject()
	payload?: any;

	@ApiProperty({
		example: new Date().toISOString(),
		type: "string"
	})
	@IsOptional()
	@IsDateString({}, {message: "scheduledAt muse be a valid ISO date string"})
	scheduledAt?: Date;
}