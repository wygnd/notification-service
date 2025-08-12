import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {GetNotificationDto} from "./dto/get-notification.dto";
import {NotificationsService} from "./notifications.service";
import {NotificationDto} from "./dto/notification.dto";

@Controller()
export class NotificationsController {
	constructor(private readonly notificationService: NotificationsService) {}

	@Get("/notifications/:id")
	async getNotificationById(@Param("id") params: GetNotificationDto): Promise<NotificationDto> {
		return await this.notificationService.getNotificationById(params.id);
	}

	@Post("/notifications")
	async createNotification(@Body() notificationDto: CreateNotificationDto): Promise<void> {
		return await this.notificationService.crateNotification(notificationDto);
	}
}