import {IsUUID} from "class-validator";

export class GetNotificationDto {
	@IsUUID(4, {message: "ID must be UUIDv4"})
	id: string;
}