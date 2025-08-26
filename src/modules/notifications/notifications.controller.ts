import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Query
} from "@nestjs/common";
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {GetNotificationDto} from "./dto/get-notification.dto";
import {NotificationsService} from "./notifications.service";
import {EventPattern} from "@nestjs/microservices";
import {ListNotificationDto} from "./dto/list-notification.dto";

@Controller()
export class NotificationsController {
	constructor(
		private readonly notificationService: NotificationsService,
	) {}

	@Get("/notifications/:id")
	async getNotificationById(@Param() params: GetNotificationDto) {
		try {
				return await this.notificationService.getNotificationById(params.id);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Post("/notifications/create")
	async createNotification(@Body() notificationDto: CreateNotificationDto) {
		try {
			return await this.notificationService.createNotification(notificationDto);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	/* Imitate notification message */
	@EventPattern('create_notification')
	async handleEvent(data: any) {
		console.log("NEW NOTIFICATION", data)
	}

	@Get("/notifications")
	async listNotifications(@Query() query?: ListNotificationDto) {
		try{
			return this.notificationService.getListNotifications(query);
		} catch(error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}