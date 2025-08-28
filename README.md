# Notification Service

English | [Русский](./README.ru.md)

Service takes task of sending a request(email, SMS, push) sends them RabbitMQ, processes, caches status in Redis and provides API for checking status.

## Overview
- [Tech stack](#tech-stack)
- [Installation and starting project](#installation)

# Tech stack
- **BackEnd:** NestJS
- **Data Storage:** PostgreSQL with Sequelize
- **Message broker:** RabbitMQ
- **Cache:** Redis
- **Api Documentation:** Swagger
- **Testing:** Jest

## Installation and starting project
1. Clone repository:
```bash
git clone <repository-url>
cd notification-service
```
2. Install dependencies:
```bash
npm install 
```
3. Create .evn file:
```dotenv
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=notifications
DB_USER=postgres
DB_PASSWORD=postgres
RABBITMQ_URL=amqp://user:user@localhost:5672
RABBITMQ_QUEUE=notifications
REDIS_HOST=localhost
REDIS_PORT=6379
```
4. Execute DataBase, RabbitMQ, Redis in your server
5. Start service:
```bash
npm run start:dev 
```
6. Swagger API will be available in: http://localhost:5000/api

## Testing
Run all tests:
```bash
npm run test
```
Run test with coverage:
```bash
npm run test:cov
```

## Flow data by receive notification
1. Notification Controller
   - Endpoint HTTP-requests: `/notifications`
   - Data is validated in the DTO
   - After validate controller pass responsibility to service: `Notification Serivce`
2. Notification Service
   - Base logic
     - Save notification in DataBase(`PostgreSQL`) via ORM `Sequelize`
     - Call `Notification Producer`, who sending message in `RabbitMQ`
     - Save notification in cache `Redis`
3. Notification Producer
   - Gett notification object from 'Notification Service'
   - Send event in queue
   - Give an event consumers
4. Redis
   - Cache notification, after receive them by ID
   - Accelerates GET-requests to: `/notifications/:id'

## Flow data by creating notification
1. POST-request to: `/notifications/create`
2. `Notification Controller` validate data, if data is not valid return error with 400 status code
3. `Notification Controller` after validate data send them to `Notification Service`
4. `Notification Service:`
   - Save notification in DataBase
   - Send notification in queue via `RabbitMQ`
   - Save notification in cache `Redis`
5. `Consumer` receive notification and print them in console(for example)