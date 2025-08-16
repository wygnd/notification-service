import {Body, Controller, Get, HttpException, HttpStatus, LoggerService, Param, Post} from "@nestjs/common";
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {GetNotificationDto} from "./dto/get-notification.dto";
import {NotificationsService} from "./notifications.service";
import {NotificationDto} from "./dto/notification.dto";
import {NotificationProducer} from "./producers/notification.producer";
import {SendMessageNotificationDto} from "./dto/send-message-notification.dto";
import {NotificationMessage} from "./interfaces/notification.interface";

@Controller()
export class NotificationsController {
	constructor(
		private readonly notificationService: NotificationsService,
		private readonly notificationProducer: NotificationProducer
	) {}

	@Get("/notifications/:id")
	async getNotificationById(@Param("id") params: GetNotificationDto): Promise<NotificationDto> {
		try {
			return await this.notificationService.getNotificationById(params.id);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Post("/notifications")
	async createNotification(@Body() notificationDto: CreateNotificationDto): Promise<NotificationDto> {
		try {
			const notification = await this.notificationService.crateNotification(notificationDto);
			const observeSending = this.notificationProducer.sendMessage(NotificationMessage.MESSAGE, new SendMessageNotificationDto(notification));

			console.log("Notification was sending", observeSending);

			return notification;
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}