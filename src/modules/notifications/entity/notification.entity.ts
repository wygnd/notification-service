import {Table, Column, Model, PrimaryKey, DataType, Default} from "sequelize-typescript";
import {DataTypes} from "sequelize";

enum NotificationType {
	EMAIL = "email",
	SMS = "sms",
	PUSH = "push",
	WEBHOOK = "{webhook}",
	IN_APP = "in_app"
}

enum NotificationStatus {
	PENDING = "pending",
	QUEUED = "queued",
	PROCESSING = "processing",
	SENT = "sent",
	RETRYING = "retrying",
	FAILED = "failed",
	CANCELLED = "cancelled"
}

@Table({tableName: "notifications"})
export class NotificationModel extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column({type: DataType.UUID})
	notification_id: string;

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
}