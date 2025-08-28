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
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {NotificationDto} from "./dto/notification.dto";
import {NotificationModel} from "./entities/notification.entity";
import {ErrorResponseDto} from "./dto/error-response.dto";

@ApiTags("notifications")
@Controller()
export class NotificationsController {
	constructor(
		private readonly notificationService: NotificationsService,
	) {}

	@ApiOperation({ summary: "Get notification by ID" })
	@ApiResponse({status: 200, description: "Return notification object", type: NotificationModel})
	@ApiResponse({status: 400, description: "ID must be UUIDv4", type: ErrorResponseDto})
	@ApiResponse({status: 400, description: "Bad request", type: ErrorResponseDto})
	@ApiResponse({status: 404, description: "Notification not found", type: ErrorResponseDto})
	@Get("/notifications/:id")
	async getNotificationById(@Param() params: GetNotificationDto) {
		try {
				return await this.notificationService.getNotificationById(params.id);
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation({summary: "Create notification" })
	@ApiResponse({status: 200, description: "Return notification object", type: NotificationModel})
	@ApiResponse({status: 400, description: "Error by creating new notification", type: ErrorResponseDto})
	@ApiResponse({status: 400, description: "Invalid notification type", type: ErrorResponseDto})
	@ApiResponse({status: 400, description: "Invalid notification status", type: ErrorResponseDto})
	@ApiResponse({status: 400, description: "Field recipient is required", type: ErrorResponseDto})
	@ApiResponse({status: 400, description: "scheduledAt muse be a valid ISO date string", type: ErrorResponseDto})
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

	@ApiOperation({ summary: "Get list notifications" })
	@ApiResponse({status: 200, description: "Return list notifications", type: [NotificationModel]})
	@ApiResponse({status: 400, description: "Bad request", type: ErrorResponseDto})
	@Get("/notifications")
	async listNotifications(@Query() query?: ListNotificationDto) {
		try{
			return this.notificationService.getListNotifications(query);
		} catch(error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}
}