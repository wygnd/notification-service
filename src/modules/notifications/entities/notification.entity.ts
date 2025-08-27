import {Table, Column, Model, PrimaryKey, DataType, Default} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Notification, NotificationStatus, NotificationType} from "../interfaces/notification.interface";
import {CreateNotificationDto} from "../dto/create-notification.dto";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: "notifications"})
export class NotificationModel extends Model<NotificationModel, CreateNotificationDto> {
	@ApiProperty({
		example: "2285665d-5a55-4700-a360-261d40e7b5e9",
		description: "Unique identifier",
		type: "string"
	})
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column({type: DataType.UUIDV4})
	notificationId: string;

	@ApiProperty({
		example: "email",
		description: "Notification type",
		enum: NotificationType,
		type: "string"
	})
	@Column({type: DataType.ENUM(...Object.values(NotificationType)), allowNull: false})
	type!: NotificationType;

	@ApiProperty({
		example: "user@example.com",
		description: "Notification recipient",
		type: "string"
	})
	@Column({type: DataType.STRING, allowNull: false})
	recipient: string;

	@ApiProperty({
		example: "Добро пожаловать в наше приложение!",
		description: "Notification message",
		type: "string"
	})
	@Column({type: DataTypes.TEXT})
	message: string;

	@ApiProperty({
		example: "pending",
		type: "string",
		default: NotificationStatus.PENDING,
		description: "Notification status",
	})
	@Default(NotificationStatus.PENDING)
	@Column({type: DataType.ENUM(...Object.values(NotificationStatus)), allowNull: false})
	status!: NotificationStatus;

	@ApiProperty({
		example: "Регистрация завершена",
		description: "Notification payload",
	})
	@Column({type: DataType.JSONB, allowNull: true})
	payload?: any

	@ApiProperty({
		example: 0,
		default: 0,
		type: "number",
		description: "Max attempts Notification",
	})
	@Default(0)
	@Column({ type: DataType.INTEGER})
	attempts!: number;

	@ApiProperty({
		example: 3,
		type: "number",
		description: "Max attempts Notification",
	})
	@Default(3)
	@Column({ type: DataType.INTEGER})
	maxAttempts!: number;

	@ApiProperty({
		example: "Bad request",
		type: "string",
		description: "If exists, last error to send notification"
	})
	@Column({type: DataType.STRING, allowNull: true})
	lastError?: string;

	@ApiProperty({
		example: "2025-08-27T17:09:05.589Z",
		type: "string",
		description: "Date when was scheduled"
	})
	@Column({type: DataType.DATE, allowNull: true})
	scheduledAt?: Date;

	@ApiProperty({
		example: "2025-08-27T17:09:05.589Z",
		type: "string",
		description: "Date when next retry send notification"
	})
	@Column({type: DataType.DATE, allowNull: true})
	nextRetryAt?: Date

	@ApiProperty({
		example: "2025-08-27T17:09:05.589Z",
		type: "string",
		description: "When notification was sent"
	})
	@Column({type: DataType.DATE, allowNull: true})
	sentAt?: Date;

	@ApiProperty({
		example: "2025-08-27T17:09:05.589Z",
		type: "string",
		description: "When notification was delivered"
	})
	@Column({type: DataType.DATE, allowNull: true})
	deliveredAt?: Date;

	@ApiProperty({
		example: 0,
		type: "number",
		description: "Priority notification",
	})
	@Default(0)
	@Column({type: DataType.INTEGER})
	priority!: number;
}