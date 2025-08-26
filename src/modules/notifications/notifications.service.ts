import {HttpException, HttpStatus, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {NotificationModel} from "./entities/notification.entity";
import {CreateNotificationDto} from "./dto/create-notification.dto";
import {NotificationMessage, NotificationStatus} from "./interfaces/notification.interface";
import {NotificationDto} from "./dto/notification.dto";
import {ListNotificationDto} from "./dto/list-notification.dto";
import {NotificationProducer} from "./producers/notification.producer";
import {Cache, CACHE_MANAGER} from "@nestjs/cache-manager";
import {SendMessageNotificationDto} from "./dto/send-message-notification.dto";

@Injectable()
export class NotificationsService {
	constructor(
		@Inject("NotificationRepository")
		private readonly notificationRepository: typeof NotificationModel,
		private readonly notificationProducer: NotificationProducer,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}

	async getNotificationById(notificationId: string) {
		const cacheNotification = await this.cacheManager.get<NotificationDto>(notificationId);

		if(!cacheNotification) {
			const notification = await this.notificationRepository.findByPk<NotificationModel>(notificationId);

			if(!notification) throw new NotFoundException("Notification not found.");

			const notificationDto = new NotificationDto(notification);
			await this.cacheManager.set<NotificationDto>(notification.notificationId, notificationDto);
			return notificationDto;
		}

		return cacheNotification;
	}

	async createNotification(newNotificationDto: CreateNotificationDto) {
		const newNotification = await this.notificationRepository.create({
			type: newNotificationDto.type,
			status: newNotificationDto.status ? newNotificationDto.status : NotificationStatus.PENDING,
			recipient: newNotificationDto.recipient,
			message: newNotificationDto.message ? newNotificationDto.message : "",
			payload: newNotificationDto.payload ? newNotificationDto.payload : null,
			scheduledAt: newNotificationDto.scheduledAt ? newNotificationDto.scheduledAt : new Date(),
		});

		if(!newNotification) throw new HttpException("Error by creating new notification", HttpStatus.BAD_REQUEST);
		const notificationDto = new NotificationDto(newNotification);
		await this.notificationProducer.sendMessage(NotificationMessage.CREATE_NOTIFICATION, new SendMessageNotificationDto(notificationDto));
		await this.cacheManager.set(notificationDto.notificationId, notificationDto);
		return notificationDto;
	}

	async getListNotifications(query?: ListNotificationDto) {

		if(!query || Object.entries(query).length === 0) return await this.notificationRepository.findAll();

		const {order, orderby} = query;
		return await this.notificationRepository.findAll({
			order: [[ orderby, order ]],
		});
	}
}