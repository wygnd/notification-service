import {NotificationsService} from "./notifications.service";
import {NotificationsController} from "./notifications.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {HttpException} from "@nestjs/common";
import {NotificationType} from "./interfaces/notification.interface";

const testNotification = {
	notificationId: "2285665d-5a55-4700-a360-261d40e7b5e9",
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

describe("NotificationController", () => {
	let service: NotificationsService;
	let controller: NotificationsController;

	const mockNotificationModel = {
		create: jest.fn(),
		findByPk: jest.fn(),
		findAll: jest.fn(),
	}

	const mockService = {
		getListNotifications: jest.fn(() => [testNotification]),
		createNotification: jest.fn(() => testNotification),
		getNotificationById: jest.fn().mockImplementation((id: string) => ({...testNotification, notificationId: id})),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [NotificationsController],
			providers: [
				{
					provide: "NotificationRepository",
					useValue: mockNotificationModel
				},
				{
					provide: NotificationsService,
					useValue: mockService,
				}
			]
		}).compile();

		controller = module.get(NotificationsController);
		service = module.get(NotificationsService);
	})

	it("Controller should be defined", () => {
		expect(controller).toBeDefined();
	})

	it("Should create new notification", async () => {
		expect(await controller.createNotification({
			type: NotificationType.EMAIL,
			recipient: "user@example.com",
			message: "Добро пожаловать в наше приложение!",
			payload: {
				subject: "Регистрация завершена",
				link: "https://example.com/welcome"
			}
		})).toEqual(testNotification);
	})

	it("Should return an array of notifications", async () => {
		expect(await controller.listNotifications()).toEqual([testNotification]);
	})

	it("Should return notification", async () => {
		await controller.getNotificationById({id: testNotification.notificationId})
		expect(service.getNotificationById).toHaveBeenCalled()
	})

	it("Should throw error cause id is not UUIDv4", async () => {
		try {
			await controller.getNotificationById({id: "1231231231"})
		} catch(error) {
			expect(error).toBeInstanceOf(HttpException);
			expect(error.statusCode).toEqual(400);
			expect(error.message).toEqual("ID must be UUIDv4");
		}
	})

	it("Should throw error cause id not found", async () => {
		try {
			await controller.getNotificationById({id: "2285665d-5a55-4700-a320-251d40e7b5e9"});
		} catch(error) {
			expect(error).toBeInstanceOf(HttpException);
			expect(error.status).toEqual(404);
			expect(error.message).toEqual("Notification not found");
		}
	})
})