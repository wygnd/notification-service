# Сервис уведомлений (Notification Service)

Сервис принимает задачи на отправку уведомлений (email, SMS, push), отправляет их в очередь (RabbitMQ), обрабатывает, кеширует статус в Redis и предоставляет API для проверки статуса.

## Содержание
 - [Технологии](#технологии)
 - [Установка](#установка)
 - [Настройка и запуск](#настройка-и-запуск-приложения)
 - [Тестирование](#тестирование)
 - [Поток данных при получении уведомления](#поток-данных-при-получении-уведомления)
 - [Поток данных при создании уведомления](#поток-данных-при-создании-уведомления)

## Технологии
 - BackEnd — NestJs
 - Работа с базой данных — Sequelize
 - Очередь сообщений — RabbitMQ
 - Кеширование — Redis
 - Тестирование — Jest
 - Документация — Swagger(Coming soon)

## Установка
1. Клонируем репозиторий:
```bash
git clone <repository-url>
cd notification-service 
```
2. Устанавливаем зависимости:
```bash
npm install 
```
3. Создаем .env файл:
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

## Настройка и запуск приложения
1. Поднимаем базу данных, RabbitMQ, Redis.
2. Запускаем сервис:
```bash
npm run start:dev 
```
3. Swagger API будет доступно по адресу: http://localhost:3000/api

## Тестирование
Запуск всех тестов:
```bash
npm run test
```

Запуск с покрытием:
```bash
npm run test:cov
```

## Поток данных при получении уведомления
1. NotificationController
- Точка входа HTTP-запросов (`/notifications`)
- Данные валидируются через DTO
- После валидации контроллер передает ответственность `NotificationService`
2. NotificationService
- Основная логика
  - Сохраняет уведомления в Базу данных(`PostgreSql`) через ORM `Sequelize`
  - Вызывает `NotificaionProducer`, который отправляет сообщение в `RabbitMQ`
  - Сохраняет уведомление в `Redis`
3. NotificationProducer (`RabbitMQ`)
- Получает объект уведолмения от `NotificationService`
- Отправляет событие в очередь
- В последующем отдает событие consumer’ам
4. Redis
- Кеширует уведомления, при получении их по ID
- Ускоряет GET-запрос к `/notifications/:id`

## Поток данных при создании уведомления
1. POST-запрос к `/notifications/create`
2. `NotificationController` валидирует данные, в случае ошибки возвращает ее со 400 кодом
3. `NotificationController` после валидации передает `NotificationService` работу
4. `NotificationService`:
- Сохраняет уведомление в базу данных
- Отправляет в очередь через `RabbitMQ`
- Сохраняет уведомление в `Redis`
5. `Consumer` получает уведомление и выводит его(в качестве примера выводи в консоль)