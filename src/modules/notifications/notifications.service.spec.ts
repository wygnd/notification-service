import {NotificationsService} from "./notifications.service";
import {Test, TestingModule} from "@nestjs/testing";
import {NotificationProducer} from "./producers/notification.producer";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {NotificationStatus, NotificationType} from "./interfaces/notification.interface";
import {NotFoundException} from "@nestjs/common";

describe("NotificationService", () => {
	let service: NotificationsService;

	const mockNotificationService = {
		create: jest.fn(),
		findByPk: jest.fn(),
		findAll: jest.fn()
	};

	const mockRedis = {
		set: jest.fn(),
		get: jest.fn(),
	}

	const mockProducer = {
		sendMessage: jest.fn(),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [NotificationsService,
				{provide: "NotificationRepository", useValue: mockNotificationService},
				{provide: NotificationProducer, useValue: mockProducer},
				{provide: CACHE_MANAGER, useValue: mockRedis},
			]
		}).compile();

		service = module.get<NotificationsService>(NotificationsService);
	})

	it("Service should be defined", () => {
		expect(service).toBeDefined();
	})

	describe("List all notifications", () => {
		it("Should get all notifications", async () => {
			await service.getListNotifications();
			expect(mockNotificationService.findAll).toHaveBeenCalledTimes(1);
		})
	})

	describe("Create notification", () => {
		it("Should create notification", async () => {
			const newNotification = {
				type: NotificationType.EMAIL,
				recipient: "user@example.com",
				message: "Добро пожаловать в наше приложение!",
				payload: {
					subject: "Регистрация завершена",
					link: "https://example.com/welcome"
				}
			};
			const createdNotification = {
				notificationId: "307931dc-4ddf-4bfb-918f-a6fb827cb85d",
				type: "email",
				recipient: "user@example.com",
				message: "Добро пожаловать в наше приложение!",
				payload: {
					link: "https://example.com/welcome",
					subject: "Регистрация завершена"
				},
				attempts: 0,
				maxAttempts: 3,
				lastError: null,
				nextRetryAt: null,
				sentAt: null,
				deliveredAt: null,
				priority: 0,
				status: "pending"
			};

			mockNotificationService.create.mockResolvedValue({
				getDataValue: (key: string) => {
					return createdNotification[key];
				}
			});
			const notification = await service.createNotification(newNotification);

			expect(notification).toEqual(createdNotification);
			expect(notification.status).toBe(NotificationStatus.PENDING);
			expect(mockNotificationService.create).toHaveBeenCalledTimes(1);
			expect(mockProducer.sendMessage).toHaveBeenCalled();
			expect(mockRedis.set).toHaveBeenCalled();
		})
	})

	describe("Get notification", () => {
		const notificationId = "2285665d-5a55-4700-a360-261d40e7b5e9";
		const getNotification = {
			notificationId: notificationId,
			type: "email",
			recipient: "user@example.com",
			message: "Добро пожаловать в наше приложение!",
			payload: {
				link: "https://example.com/welcome",
				subject: "Регистрация завершена"
			},
			attempts: 0,
			maxAttempts: 3,
			lastError: null,
			nextRetryAt: null,
			sentAt: null,
			deliveredAt: null,
			priority: 0,
			status: "pending"
		}

		it("Should get notification", async() => {
			mockNotificationService.findByPk.mockResolvedValue({
				getDataValue: (key: string) => getNotification[key],
			});
			const notification = await service.getNotificationById(notificationId);

			expect(notification).toEqual(getNotification);
			expect(mockRedis.get).toHaveBeenCalled();
		})

		it("Show throw error cause ID ", async () => {
			const notifyId = "2285665d";

			mockNotificationService.findByPk.mockResolvedValue(null)

			try {
				const notification = await service.getNotificationById(notifyId);
				expect(notification).toBeUndefined();
				expect(mockRedis.set).toHaveBeenCalled();
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundException);
			}
		})
	})
})