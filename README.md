# ClickerBattle API
NodeJS библиотека для работы с API приложения «Битва Кликеров».

# Установка
```
npm i @uly4nov/clickerbattle-api
```

# Подключение
```
const
    {API} = require('@uly4nov/clickerbattle-api'),
    clicker = new API('YOUR_API_TOKEN');
```

# Пример работы
```
console.log(await clicker.users.get) // Выведет объект пользователя
console.log(await clicker.users.transfer(245481845, 1)) // Выведет true (Если на счету больше 0 кликов)
```

# Методы API

## users.get

**Описание:**

Получение данных пользователя.

**Ответ:**

```
{
    id: <идентификатор_vk>,
    clicks: <клики>,
    lvl: <уровень>,
    xp: <опыт>,
    wins: <победы>,
    loses: <поражения>,
    energy: <энергия>,
    persons: <персонажи>,
    activePerson: <активный_персонаж>,
    activeSkins: <активные_скины>,
    banners: <баннеры>,
    bannerChanged: <установленный_баннер>,
    bannersStat: <элементы_статистики_баннера>,
    bannerStatChanged: <установленный_элемент_статистики_баннера>,
    cursors: <курсоры>,
    cursorChanged: <установленный_курсор>,
    bp: <есть_ли_боевой_пропуск>,
    bpLvl: <уровень_боевого_пропуска>,
    bpXp: <опыт_боевого_пропуска>,
    caseStandart: <количество_обычных_кейсов>,
    caseEpic: <количество_эпических_кейсов>,
    caseLeg: <количество_легендарных_кейсов>,
    caseMystic: <количество_мистических_кейсов>,
    lastCaseGot: <последний_уровень_за_который_был_получен_кейс>,
    ref: <чей_вы_реферал>,
    refs: <ваши_рефералы>,
    tr: <количество_кликов_переведённых_за_день>,
    trHistory: <история_переводов>,
    day: <ваша_статистика_за_день>,
    apiToken: <ваш_токен>,
    apiCallbackUrl: <callback_url>,
    banned: <статус_блокировки>,
    banReason: <причина_блокировки>,
    name: <ваше_имя>,
    photo: <ваше_фото>,
    unbanBought: <сколько_разбанов_было_куплено>,
    kpsArray: <массив_с_кпс_по_всем_играм> 
}
```

## users.getDay

**Описание:**

Топ всех игроков за день.

**Ответ:**

```
[ 
    …<игроки>
]
```

## users.transfer

**Описание:**

Перевод кликов игроку.

**Параметры:**

| Параметр | Тип  | Описание                       |
|----------|------|--------------------------------|
|user_id   |number|Идентификатор (vk_id) получателя|

**Ответ:**

```
true
```

При выполнении запроса могут возникнуть следующие ошибки: 1, 2, 3, 4, 5, 6.

## bill.create

**Описание:**

Создать счет для оплаты.

**Параметры:**

| Параметр | Тип  | Описание                        |
|----------|------|---------------------------------|
|user_id   |number|Идентификатор (vk_id) плательщика|
|amount    |number|Количество кликов                |

**Ответ:**

```
{
    fromId: <id_плательщика>,
    toId: <id_получателя>,
    amount: <количество_кликов>,
    id: <идентификатор_счёта>,
    success: <статус_оплаты>,
    url: <ссылка_для_оплаты>
}
```

При выполнении запроса могут возникнуть следующие ошибки: 1, 4.

## bill.getById

**Описание:**

Получить информацию о счёте.

**Параметры:**

| Параметр | Тип  | Описание          |
|----------|----- |-------------------|
|bill_id   |number|Идентификатор счета|

**Ответ:**

```
{
    fromId: <id_плательщика>,
    toId: <id_получателя>,
    amount: <количество_кликов>,
    id: <идентификатор_счёта>,
    success: <статус_оплаты>,
    url: <ссылка_для_оплаты>
}
```

При выполнении запроса могут возникнуть следующие ошибки: 7, 8.

## callback.setUrl

**Описание:**

Установить адрес Callback API. При запросе, на URL будет сделан GET запрос; Ваш сервер должен вернуть JSON-объект с параметром user_id, равным Вашему vk_user_id.

**Параметры:**

| Параметр | Тип  | Описание                   |
|----------|----- |----------------------------|
|url       |string|Ссылка для получения событий|

**Ответ:**

```
true
```

При выполнении запроса могут возникнуть следующие ошибки: 9, 10.

**События:**

| Название | Параметры                                                                                       | Описание события     |
|----------|--------------------------------------------------------------------------|----------------------|
|transfer  |```{ fromId: <от_кого_платёж>, amount: <количество_кликов>, ?bill_id: <идентификатор_счёта> }``` |Поступил новый перевод|

**Пример нового события:**
```
{
    event: 'transfer',
    data: {
        fromId: 245481845,
        amount: 100
    }
}
```

## Ошибки

**Структура объекта ошибки:**

```
{ 
    error: {
        code: <код_ошибки>,
        text: <текстовое_сопровождение_ошибки>,
        ...дополнительные_поля
    }
}
```

**Коды и описания ошибок:**

| Код | Описание ошибки                                                      |
|:---:|----------------------------------------------------------------------|
|-1   |Некорректный метод                                                    |
|0    |Отсутствуют обязательные параметры                                    |
|1    |Количество кликов для перевода превышает лимит, либо слишком маленькое|
|2    |Превышен лимит для перевода                                           |
|3    |Вы не можете совершить перевод самому себе                            |
|4    |Игрок не найден                                                       |
|5    |У игрока недостаточно кликов                                          |
|6    |Не верно задано количество                                            |
|7    |Счёт не найден                                                        |
|8    |Вы не можете совершить эту операцию                                   |
|9    |Некорректная ссылка                                                   |
|10   |Ответ от callback сервера не принят                                   |

# Callback
Модуль для работы с Callback API.

# Пример запуска

```
const
    {Callback, EventType} = require('@uly4nov/clickerbattle-api'),
    callback = new Callback('YOUR_TOKEN');

callback.run(3000); // Можно указать свой порт; по стандарту — 8080
callback.onEvent((type, data) => {
    // Работаем с событиями
    if(type === EventType.TRANSFER){
        console.log('New transfer: ', data);
    }
});
```