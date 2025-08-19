import {Body, Controller, Get, HttpException, HttpStatus, LoggerService, Param, Post} from "@nestjs/common";
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {GetNotificationDto} from "./dto/get-notification.dto";
import {NotificationsService} from "./notifications.service";
import {NotificationDto} from "./dto/notification.dto";
import {NotificationProducer} from "./producers/notification.producer";
import {EventPattern} from "@nestjs/microservices";
import {NotificationModel} from "./entities/notification.entity";
import {NotificationMessage} from "./interfaces/notification.interface";
import {SendMessageNotificationDto} from "./dto/send-message-notification.dto";

@Controller()
export class NotificationsController {
	constructor(
		private readonly notificationService: NotificationsService,
		private readonly notificationProducer: NotificationProducer,
	) {}

	@Get("/notifications/:id")
	async getNotificationById(@Param() params: GetNotificationDto) {
		try {
			console.log(typeof params);
			return await this.notificationService.getNotificationById(params.id);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Post("/notifications")
	async createNotification(@Body() notificationDto: CreateNotificationDto) {
		try {
			const notification = await this.notificationService.crateNotification(notificationDto);
			await this.notificationProducer.sendMessage(NotificationMessage.CREATE_NOTIFICATION, new SendMessageNotificationDto(notification));
			return notification;
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@EventPattern('create_notification')
	async handleEvent(data: any) {
		console.log("Handle event", data)
	}
}