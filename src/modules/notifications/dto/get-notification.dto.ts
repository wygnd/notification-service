import {IS_NOT_EMPTY, IsUUID} from "class-validator";

export class GetNotificationDto {
	@IsUUID(4, { message: 'Invalid notification ID' })
	id: string;
}