<div style="border-radius: 28px" align="center">
  <a href="https://vk.com/clicker/">
    <img width="100" height="100" src="https://i.ibb.co/nwWTLhY/clicker.png">
  </a>
</div>


# API «Битвы Кликеров»
NodeJS библиотека для работы с API мини-приложения ВКонтакте «Битва Кликеров».

# Установка
```
npm i @uly4nov/clickerbattle-api
```

# Подключение
```javascript
const
    {API} = require('@uly4nov/clickerbattle-api'),
    clicker = new API('YOUR_API_TOKEN')
;
```

# Пример работы
```javascript
console.log(await clicker.users.get) // Выведет объект пользователя
console.log(await clicker.users.transfer(245481845, 1)) // Выведет true (Если на счету больше 0 кликов)
```

# Методы API

## users.get

**Описание**

Информация о текущем пользователе.

**Результат**

Возвращает объект, который содержит следующие поля:

```json
{
   "id": "number",
   "clicks": "number",
   "wins": "number",
   "loses": "number",
   "day": "object",
   "week": "object",
   "xp": "number",
   "lvl": "number",
   "energy": "number",
   "cps": "array",
   "persons": "array",
   "activePerson": "number",
   "skins": "object",
   "activeSkins": "object",
   "banners": "array",
   "bannerChanged": "number",
   "bannersStat": "array",
   "bannerStatChanged": "number",
   "cursors": "array",
   "cursorChanged": "number",
   "bp": "boolean",
   "bpLvl": "number",
   "bpXp": "number",
   "bpLastAward": "number",
   "caseStandart": "number",
   "caseEpic": "number",
   "caseLeg": "number",
   "caseMystic": "number",
   "apiToken": "string",
   "apiCallbackUrl": "string",
   "banned": "boolean",
   "banReason": "string",
   "unbanBought": "number",
   "admin": "boolean",
   "lastGame": "number",
   "isRatingEvent": "boolean",
   "createdAt": "string",
   "updatedAt": "string"
}
```

## users.getById

**Описание**

Информация об указанном игроке.

**Параметры**

| Параметр           | Тип                | Описание                                                                   |
|--------------------|--------------------|----------------------------------------------------------------------------|
|user_id             |number              |Идентификатор пользователя                                                  |

**Результат**

Возвращает объект, который содержит следующие поля:

```json
{
   "id": "number",
   "clicks": "number",
   "wins": "number",
   "loses": "number",
   "day": "object",
   "week": "object",
   "xp": "number",
   "lvl": "number",
   "energy": "number",
   "cps": "array",
   "persons": "array",
   "activePerson": "number",
   "skins": "object",
   "activeSkins": "object",
   "banners": "array",
   "bannerChanged": "number",
   "bannersStat": "array",
   "bannerStatChanged": "number",
   "cursors": "array",
   "cursorChanged": "number",
   "bp": "boolean",
   "bpLvl": "number",
   "bpXp": "number",
   "bpLastAward": "number",
   "banned": "boolean"
}
```

## users.getTop

**Описание**

Информация о рейтингах: общий (по кликам и уровню), дневной и недельный (по кликам).

**Результат**

Возвращает объект, который содержит следующие поля:

```json
{
   "clicks": "array",
   "lvl": "array",
   "day": "array",
   "week": "array"
}
```

## transfers.send

**Описание**

Перевод валюты «клики» другому игроку.

**Параметры**

| Параметр           | Тип                | Описание                                                                   |
|--------------------|--------------------|----------------------------------------------------------------------------|
|toId                |number              |Идентификатор получателя                                                    |
|amount              |number              |Сумма                                                                       |

**Результат**

Возвращает объект, который содержит следующие поля:

```json
{
   "id": "number",
   "amount": "number",
   "fromId": "number",
   "toId": "number",
   "updatedAt": "string",
   "createdAt": "string"
}
```

## transfers.getHistory

**Описание**

История входящих и исходящих переводов.

**Результат**

Возвращает массив объектов. Объект содержит следующие поля:

```json
{
   "id": "number",
   "amount": "number",
   "fromId": "number",
   "toId": "number",
   "createdAt": "string",
   "updatedAt": "string"
}
```

## games.getHistory

**Описание**

История сыгранных битв.

**Результат**

Возвращает массив объектов. Объект содержит следующие поля:

```json
{
   "id": "number",
   "clicks": "number",
   "clicks1": "number",
   "clicks2": "number",
   "endTime": "number",
   "startTime": "number",
   "friendly": "boolean",
   "coords1": "array",
   "coords2": "array",
   "historyClicks1": "array",
   "historyClicks2": "array",
   "cps1": "array",
   "cps2": "number",
   "winner": "number",
   "player1": "number",
   "player2": "number",
   "exit": "boolean",
   "shares": "number"
}
```

## persons.get

**Описание**

Список игровых персонажей.

**Результат**

Возвращает массив объектов. Объект содержит следующие поля:

```json
{
   "id": "number",
   "description": "string",
   "name": "string",
   "file_name": "string",
   "price": "number",
   "skins": "array"
}
```

## shop.getItems

**Описание**

Список товаров в магазине.

**Результат**

Возвращает массив объектов. Объект содержит следующие поля:

```json
{
   "id": "number",
   "title": "string",
   "place": "string",
   "price": "number",
   "show": "boolean",
   "isRub": "boolean"
}
```

## cursor.getList

**Описание**

Список всех игровых курсоров.

**Результат**

Возвращает массив объектов. Объект содержит следующие поля:

```json
{
   "id": "number",
   "file_name": "string"
}
```

## banner.getList

**Описание**

Список всех баннеров победителей.

**Результат**

Возвращает массив объектов. Объект содержит следующие поля:

```json
{
   "id": "number",
   "type": "number"
}
```

## bannerstat.getList

**Описание**

Список элементов статистики для баннера победителя.

**Результат**

Возвращает массив объектов. Объект содержит следующие поля:

```json
{
   "id": "number",
   "text": "string",
   "key": "string"
}
```

## referal.getList

**Описание**

Список рефералов текущего пользователя.

**Результат**

Возвращает массив объектов. Объект содержит следующие поля:

```json
{
   "id": "number",
   "owner": "number",
   "createdAt": "string",
   "updatedAt": "string"
}
```

## referal.getOwner

**Описание**

Информация об игроке, который пригласил текущего пользователя в игру. Если такого нет, то возвращает `null`.

**Результат**

Возвращает объект, который содержит следующие поля:

```json
{
   "id": "number",
   "owner": "number",
   "createdAt": "string",
   "updatedAt": "string"
}
```

## bill.create

**Описание**

Выставление счёта на оплату указанному пользователю.

**Параметры**

| Параметр           | Тип                | Описание                                                                   |
|--------------------|--------------------|----------------------------------------------------------------------------|
|user_id             |number              |Идентификатор плательщика                                                   |
|amount              |number              |Сумма                                                                       |

**Результат**

Возвращает объект, который содержит следующие поля:

```json
{
   "success": "boolean",
   "id": "number",
   "fromId": "number",
   "toId": "number",
   "amount": "number",
   "updatedAt": "string",
   "createdAt": "string",
   "url": "string"
}
```

## bill.getById

**Описание**

Информация об указанном счёте на оплату.

**Параметры**

| Параметр           | Тип                | Описание                                                                   |
|--------------------|--------------------|----------------------------------------------------------------------------|
|bill_id             |number              |Идентификатор счёта                                                         |

**Результат**

Возвращает объект, который содержит следующие поля:

```json
{
   "id": "number",
   "amount": "number",
   "fromId": "number",
   "success": "boolean",
   "toId": "number",
   "url": "string",
   "createdAt": "string",
   "updatedAt": "string"
}
```

## callback.setUrl

**Описание**

Установка URL вашего Callback сервера.

**Параметры**

| Параметр           | Тип                | Описание                                                                   |
|--------------------|--------------------|----------------------------------------------------------------------------|
|url                 |string              |Новая ссылка Callback сервера                                               |

**Результат**


```json
{
    "response": "string"
}
```

# Callback
Модуль для работы с Callback API.

# Пример запуска

```javascript
const
    {Callback, EventType} = require('@uly4nov/clickerbattle-api'),
    callback = new Callback('YOUR_TOKEN');

callback.run('cb_callback', 3000); // Можно указать свой порт и путь; по стандарту — 'callback', 8080
callback.onEvent((type, data) => {
    // Работаем с событиями
    if(type === EventType.TRANSFER) {
        console.log('Новый платёж: ', data);
    }
});
```

# Процедуры

## run

**Описание**

Запуск Callback сервера.

**Параметры**

| Параметр           | Тип                | Описание                                                                   |
|--------------------|--------------------|----------------------------------------------------------------------------|
|path                |string              |Путь к серверу (не обязательно)                                             |
|port                |number              |Порт сервера (не обязательно)                                               |

## onEvent

**Описание**

Установка функции для обработки событий. В функцию приходят два параметра: type и data, где type — тип события, data — данные события.

**Параметры**

| Параметр           | Тип                | Описание                                                                   |
|--------------------|--------------------|----------------------------------------------------------------------------|
|func                |function            |Функция при получении события                                               |
