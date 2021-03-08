## Ссылка на прототип чата 
https://www.figma.com/file/6dl1BOu9IBbaDAn63CNYl4/Chat?node-id=2%3A761

## Проект можно посмотреть на netlify 
https://vigilant-goldwasser-886a78.netlify.app

## Проект можно посмотреть на heroku
https://glacial-atoll-24982.herokuapp.com


## Установка
* `npm start` - запуск версии для разработчика на `localhost:3000`
* `npm run build` - запуск сборки приложения для прода
* `npm test` - запуск тестов
* `npm run deploy` - деплой на heroku
* `npm run verify` - запуск проверки при прекоммит хуке

## Сборка
Сборка проекта осуществляется webpack 5. Конфиг для прода и разработки `webpack.config.js`.
После сборки вся статика и js лежит внутри `build`.
Также создан Dockerfile.

## Описание

### Прототипы
Прототипы чата основаны на макете Яндекс.Практикума. Прототипы в figma можно посмотреть по ссылке выше :).  

### Страницы
Проект имеет несколько страниц:
  * страницы об ошибках (404, 5**)
  * формы регистрации и авторизации
  * профиль (редактирование информации профиля/аватара, просмотр профиля, изменение пароля)
  * страницы чата 
      * список чатов; из списка чатов можно попасть в профиль; также в списке чатов есть кнопка для создания нового чата
      * лента переписки - диалог; диалог имеет всплывающие окна для возможности прикрепить к сообщению фото, видео или документ, а также всплывающее окно с настройками диалога - добавление пользователя в диалог, удаление пользователя из диалога, удаление чата. 
        эти всплывающие окна доступны для взаимодействия, если пользователь выбрал чат.
        пока чат не выбран, отображается надпись "Выберите чат".

`./static/index.html` - основная страница, на которой рендерятся остальные в зависимости от пути.

### Основные элементы проекта
в `./src/core/` лежат основные элементы проекта:
* `Block`,
* `EventBus`,
* `GlobalEventBus`,
* `ServerError`,
* модуль отправки запросов `HTTP`
* `Router`
* `Route`
* `Store`
* `ComponentController`
* модуль для работы с вебсокетами `WebSockerService`

#### Компонент  
Компоненты можно найти в `./src/components/`.

Верстка страниц собирается из компонентов. Верстка для каждого компонента лежит в `template.ts`. 
Все компоненты наследуются от `Block`. 

Метод `compile` из `./src/utils/` использует методы шаблонизатора Handlebars. 
Шаблонизатор подключен через CDN, добавлены типы для шаблонизатора.
Строка, которую получаем из шаблонизатора, вставляем через `innerHTML` в обертку компонента, так как во всех случаях 
строка содержит разметку (т.е. html-тэги). 
Контент добавляется через `textContent`.

Выделены отдельные модули для кнопки, инпута, ошибки, всплывающего окна для оповещений, иконки фотографии.
В компонентах описаны типы передаваемых пропсов, для опциональных пропсов добавлены значения по-умолчанию.
В проекте используются модули ES6.

#### Контроллер
Контроллеры лежат в `./src/controllers`. Для каждой страницы выделен свой контроллер. В папке с контроллером лежат 
модуль самого контроллера `index.ts` и файл пропсов по умолчанию `props.ts`. 

Каждый контроллер наследуется от 
`ComponentController`. В нем определяются методы для работы с данными и отправкой или получением данных с сервера, 
подписка на события и триггерирование событий при инициализации. В контроллере реализован паттерн "Синглтон" 
для создания только одного экземпляра класса контроллера. 

В `props.ts` помимо пропсов по умолчанию также определены слушатели событий по умолчанию. 

#### Роутер
Роутер отвечает за изменение url: при изменении url он передает управление контроллеру, который соответствует `pathaname`.
Если введенный адрес не соответствует ни одному контроллеру, то отображается страница с 404 ошибкой `/notFound`.
Также реализована возможность перемещаться вперед и назад по истории через History API.

Экземпляр класса роутера создается в файле main.ts. Это основной модуль проекта. В этом файле мы определяем все 
роуты для проекта и соответствующие им контроллеры.

Взаимодействие с контроллерами осуществляется через `Route`, который хранит url и соответствующий ему контроллер, 
показывает и скрывает блоки.

#### Модуль обработки запросов
Классы для работы с апи лежат в `./src/api`. Они наследуются от `HTTP`. 
В `HTTP` работа с запросами реализована через XMLHttpRequest API. 
В нем определены основные методы отправки запросов 
(GET, POST, PUT, DELETE), заголовки по умолчанию, обработка ошибки (по статусу запроса), 
преобразование данных в нужный формат.

Класс АПИ состоит из пути и набора методов для оправки запроса.

#### Вебсокеты
Если пользователь авторизован, то для него подгружаются чаты, в которых он состоит. 
Для каждого чата создается экземпляр WebSocketService, в котором прописываются токен, id чата, id юзера.
Экземпляры записываются в ChatController.sockets.
При подключении к вебсокету запрашиваются первые 200 последних сообщений через WebSocketService.getOld.
Также при установке соединения запускается таймер в 1 мин, чтобы связь не закрылась, при этом отсылается пустое сообщение.
Эти сообщения кладутся в globalStore.state.messages. После этого триггерится изменение стора и сообщения отображаются в диалоге.
Если сообщение не содержит текста (пустое), то оно не отображается в диалоге.

**Затык в работе API**. При получении старых сообщений `user_id = null` в каждом из них. Поэтому старые сообщения могут некорректно отображаться (т.е. они будут как будто присланы другим пользователем, даже если часть из них отправляли вы).
Это справедливо только для сообщений, которые пришли в ответ на запрос с типом `get old`. Для свежих сообщений все отображается нормально.

**Диалог** 
В диалоге реализована только отправка сообщений. В будущем хочу реализовать сортировку сообщений по дате, поиск по чатам, отображение непрочитанных сообщений в чате, отправку изображений или файлов.

### Тесты 
Тесты для написаны для Блока (компонент "Кнопка"), Роутера и модуля отправки запросов. 
В тестировании используется `Mocha`, `Chai`, `sinon`.
Для тестирования замоканы методы работы с DOM, window, FormData, Handlebars, используется фейковый сервер на основе `sinon`.

### Стили
Для стилей используется `less`.
Структура стилей разбита на компоненты и базовые стили, из компонентов собираются страницы. 
Эти less-модули подключаются к каждой странице. Стили лежат в `./src/less`, преобразуются в css в `./build/style-[hash].css`.

### Проверка кода
Для проверки кода подключен eslint, для проверки стилей - stylelint. В webpack.config.js добавлены для них плагины.

### Express
Настроен Express-сервер на раздачу статики из `./build`.
