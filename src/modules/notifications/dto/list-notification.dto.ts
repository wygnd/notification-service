import {IsEnum, IsOptional} from "class-validator";

enum ListNotificationDtoOrder {
	ASC = "ASC",
	DESC = "DESC",
}

enum ListNotificationDtoOrderBy {
	NOTIFICATION_ID = "notificationId",
	DATE_CREATE = "created_at"
}

interface ListNotificationDtoFilter {

}

export class ListNotificationDto {
	@IsOptional()
	@IsEnum(ListNotificationDtoOrder, {message: "Order must be ASC or DESC"})
	readonly order: ListNotificationDtoOrder;

	@IsOptional()
	@IsEnum(ListNotificationDtoOrderBy, {message: "OrderBy missing"})
	readonly orderby: ListNotificationDtoOrderBy;
}