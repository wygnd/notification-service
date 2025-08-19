import {Table, Column, Model, PrimaryKey, DataType, Default} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Notification, NotificationStatus, NotificationType} from "../interfaces/notification.interface";
import {CreateNotificationDto} from "../dto/create-notification.dto";

@Table({tableName: "notifications"})
export class NotificationModel extends Model<NotificationModel, CreateNotificationDto> {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column({type: DataType.UUIDV4})
	notificationId: string;

	@Column({type: DataType.ENUM(...Object.values(NotificationType)), allowNull: false})
	type!: NotificationType;

	@Column({type: DataType.STRING, allowNull: false})
	recipient: string;

	@Column({type: DataTypes.TEXT})
	message: string;

	@Default(NotificationStatus.PENDING)
	@Column({type: DataType.ENUM(...Object.values(NotificationStatus)), allowNull: false})
	status!: NotificationStatus;

	@Column({type: DataType.JSONB, allowNull: true})
	payload?: any

	@Default(0)
	@Column({ type: DataType.INTEGER})
	attempts!: number;

	@Default(3)
	@Column({ type: DataType.INTEGER})
	maxAttempts!: number;

	@Column({type: DataType.STRING, allowNull: true})
	lastError?: string;

	@Column({type: DataType.DATE, allowNull: true})
	scheduledAt?: Date;

	@Column({type: DataType.DATE, allowNull: true})
	nextRetryAt?: Date

	@Column({type: DataType.DATE, allowNull: true})
	sentAt?: Date;

	@Column({type: DataType.DATE, allowNull: true})
	deliveredAt?: Date;

	@Default(0)
	@Column({type: DataType.INTEGER})
	priority!: number;
}