import {HttpException, HttpStatus, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {NotificationModel} from "./entities/notification.entity";
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {NotificationStatus} from "./interfaces/notification.interface";
import {NotificationDto} from "./dto/notification.dto";

@Injectable()
export class NotificationsService {
	constructor(
		@Inject("NotificationRepository")
		private readonly notificationRepository: typeof NotificationModel
	) {}

	async getNotificationById(notificationId: string) {
		const notification = await this.notificationRepository.findOne<NotificationModel>({where: {notificationId: notificationId}});

		if(!notification) throw new NotFoundException("Notify not found");

		return new NotificationDto(notification);
	}

	async crateNotification(notificationDto: CreateNotificationDto) {
		const newNotification = await this.notificationRepository.create({
			type: notificationDto.type,
			status: notificationDto.status ? notificationDto.status : NotificationStatus.PENDING,
			recipient: notificationDto.recipient,
			message: notificationDto.message ? notificationDto.message : "",
			payload: notificationDto.payload ? notificationDto.payload : null,
			scheduledAt: notificationDto.scheduledAt ? notificationDto.scheduledAt : new Date(),
		});

		if(!newNotification) throw new HttpException("Error by creating new notification", HttpStatus.BAD_REQUEST);
		return new NotificationDto(newNotification);
	}


	async changeNotificationStatus(notificationId: string, status: NotificationStatus): Promise<boolean> {
		const notification = await this.notificationRepository.findByPk(notificationId);

		if(!notification) return false;

		notification.status = status;
		await notification.save();
		return true;
	}
}