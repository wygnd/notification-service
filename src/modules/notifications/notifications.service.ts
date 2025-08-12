import {Inject, Injectable, NotFoundException, Param} from "@nestjs/common";
import {NotificationModel} from "./entities/notification.entity";
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {NotificationDto} from "./dto/notification.dto";

@Injectable()
export class NotificationsService {
	constructor(
		@Inject("NotificationRepository")
		private readonly notificationRepository: typeof NotificationModel
	) {}

	async getNotificationById(notificationId: string): Promise<NotificationDto> {
		const notification = await this.notificationRepository.findByPk<NotificationModel>(notificationId);

		if(!notification) throw new NotFoundException("Notify not found");

	return new NotificationDto(notification);
	}

	async crateNotification(notificationDto: CreateNotificationDto): Promise<void> {

	}
}