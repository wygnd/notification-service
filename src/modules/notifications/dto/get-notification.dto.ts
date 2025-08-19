import {IsUUID} from "class-validator";

export class GetNotificationDto {
	@IsUUID(4)
	id: string;
}