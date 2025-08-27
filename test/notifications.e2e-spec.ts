import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {NotificationsService} from "../src/modules/notifications/notifications.service";
import {NotificationsModule} from "../src/modules/notifications/notifications.module";
import request from 'supertest';
import {AppModule} from "../src/app.module";
import {NotificationsController} from "../src/modules/notifications/notifications.controller";

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


describe("Notification Module", () => {
	let app: INestApplication;

	const mockService = {
		getNotificationById: jest.fn(),
		createNotification: jest.fn(),
		getListNotifications: jest.fn(),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [
				{
					provide: NotificationsService,
					useValue: mockService
				}
			]
		})
			.compile();

		app = module.createNestApplication();
		await app.init();
	})

	afterEach(() => {
		jest.clearAllMocks();
	})


	it("GET: /notifications/:id", async () => {
		return await request(app.getHttpServer())
			.get(`/notifications/2285665d-5a55-4700-a360-261d40e7b5e9`)
			.expect(200)
	})

	it("GET: /notifications/:id with invalid id", async () => {
		return request(app.getHttpServer())
			.get("/notifications/2285665d")
			.expect(400);
	})

	it("GET: /notifications/:id with non-active id", async () => {
		return request(app.getHttpServer())
			.get("/notifications/2285665d-5a55-4700-a364")
			.expect(400)
	})

	it("GET: /notifications", async () => {
		return await request(app.getHttpServer())
			.get("/notifications")
			.expect(200)
	})
})