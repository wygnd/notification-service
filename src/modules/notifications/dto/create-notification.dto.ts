import {NotificationStatus, NotificationType} from "../interfaces/notification.interface";
import {IsDateString, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString} from "class-validator";

export class CreateNotificationDto {
	@IsEnum(NotificationType, {message: 'Invalid notification type'})
	type: NotificationType;

	@IsOptional()
	@IsEnum(NotificationStatus, {message: 'Invalid notification status'})
	status?: NotificationStatus;

	@IsNotEmpty({ message: 'Field recipient is required' })
	recipient: string;

	@IsOptional()
	@IsString()
	message?: string;

	@IsOptional()
	@IsObject()
	payload?: any;

	@IsOptional()
	@IsDateString({}, {message: "scheduledAt muse be a valid ISO date string"})
	scheduledAt: Date;
}