# HTML Academy. Личный проект «Pizza»

## Начальные требования
- Docker
- Docker-compose
- NodeJS >= 16

## Docker установка
https://docs.docker.com/get-docker/

https://dker.ru/docs/ (рус)

## Docker-compose установка
https://docs.docker.com/compose/install/

## Node js установка
Мы рекоммендуем использовать Node Version Manager для удобного управления версиями node.js

https://github.com/nvm-sh/nvm

Либо можно установить node.js отдельно

https://nodejs.org/en/download/

## Работа с помощью GNU Make
Для удобной работой с проектом мы используем GNU Make.

https://www.gnu.org/software/make/

По-умолчанию, GNU Make уже предустановлен на Unix операционных системах.
Чтобы проверить установлени ли GNU Make на вашем компьютере выполните команду в терминале

```
make --version 
```

В случае отстутствия GNU Make, мы рекоммендуем установить его.

В makefile доступны следующие команды

Установить зависимости для проекта

`$ make install_dependencies`

Запустить проект

`$ make start_project`

## Работа без GNU Make

### Frontend установка

- Перейдите в директорию (выполнить из корня приложения)

`cd frontend`

- Установите зависимости

`$ npm install`

В директории `src/frontend` возможно выполнить следующие скрипты:

```
npm run serve - запуск проекта (только клиент) в режиме разработки
npm run build - создание продакшн сборки проекта
npm run test:unit - запуск юнит тестов
npm run lint - запуск линтера
```

### Backend установка

- Перейдите в директорию (выполнить из корня приложения)

`cd backend`

- Установите зависимости

`$ npm install`

- Запуск сервера (для запуска необходима работающая база данных на порте :5432)

`$ npm start`

### Установка шаблона

- Перейдите в директорию (выполнить из корня приложения)

`cd template`

- Установите зависимости

`$ npm install`

- Запуск шаблонов

`$ npm start`

### Docker настройка

- Сборка проекта

`$ docker-compose build`

### Запуск проекта с Docker

`$ docker-compose down -v`

`$ docker-compose up`

Сервер будет доступен по адресу `localhost:3000`

Клиент будет доступен по адресу `localhost:8080`

### Запуск проекта без Docker

| Внимание: требуется ручной запуск базы данных |
|-----------------------------------------------|

- Запуск базы данных

Запустите PostgreSQL базу данных

Обновите конфигурацию подключения базы данных для сервера в файле `backend/src/datasources/database.datasource.ts`

- Запуск сервера (выполнить из корня приложения)

```
cd backend && npm start
```

- Запуск клиента (выполнить из корня приложения)

```
cd frontend && npm run dev
```

Сервер будет доспупен по адресу `localhost:3000`

Клиент будет доспупен по адресу `localhost:8080`


## Вход для авторизированного пользователя

Мы создали готового пользователя и разместили его в нашей базе данных. Для входа в систему используйте следующие данные:

```
email: user@example.com
password: user@example.com
```

Вы можете поменять данные пользователя в файле `src/backend/src/factory/users.json`

## Документация эндпоинтов сервера (OpenAPI)

Запустите проект и перейдите по адресу:

```
http://localhost:3000/explorer/
```

## Запуск и просмотр готовой верстки проекта

### С помощью GNU Make

`$ make install_template_dependencies`

`$ make run_template`

### Без GNU Make

Перейдите в директорию template:

```
cd template 
```

Установите зависимости, выполнив команду:

```
npm install
```

Запустите проект командой:

```
npm start
```

Шаблон и вёрстка будут доступны по адресу: `http://localhost:9999`.

Вёрстку можно посмотреть в директории `template/src`.

## Развертывание проекта на Windows 10 Home Edition (build 1909)

### Устанавливаем подсистему Windows для Linux (WSL) в Windows 10

Для установки требуется Windows 10 версии 1903 или более поздняя со сборкой 18362 или более поздней версии.

Устанавливаем WSL прямо по шагам, указанным [в этой статье](https://docs.microsoft.com/ru-ru/windows/wsl/install-win10#manual-installation-steps).

На шаге 6 «Установка дистрибутива Linux по выбору» для Windows 10 с русским языком в Microsoft Store нет ничего. Поэтому используем ссылки на страницы Microsoft Store ниже под картинкой: устанавливаем Ubuntu 18.04 LTS. Далее продолжаем установку по инструкции. В конце установки Ubuntu рекомендуется закрепить ярлык на начальном экране (при нажатии на «Пуск»).

Устанавливать Терминал Windows необязательно, так как удобнее использовать терминалы из VSCode.

### Настраиваем Ubuntu 18.04 LTS

Подключаем и обновляем репозиторий:

```
sudo add-apt-repository universe
sudo apt-get update
```

Устанавливаем Python 3 и его систему управления пакетами pip:

```
sudo apt install python3
python3 --version

sudo apt install -y python3-pip
pip3 --version
```

Устанавливаем make:

```
sudo apt install make
make --version
```

### Устанавливаем/обновляем NodeJS

Скачиваем и устанавливаем LTS версию 14.17.3 (включающую в себя npm 6.14.13) [отсюда](https://nodejs.org/dist/v14.17.3/node-v14.17.3-x64.msi).

Перезагружаем ОС.

### Устанавливаем Docker

Скачиваем и устанавливаем Docker Desktop on Windows.

Перезагружаем ОС.

Docker-compose уже включён в Docker Desktop on Windows. Поэтому дополнительно его устанавливать не нужно.

### Настраиваем Docker

В трее на значке Docker нажимаем правой кнопкой мыши и во всплывающем меню выбираем пункт Settings.

Переходим в Resources/WSL INTEGRATION и включаем на ней всё.

На Experimental Features оставляем параметр «Use Docker Compose V2» выключенным - будет использоваться стабильная версия 1.29

### Запускаем VS Code

При первом запуске VS Code после установки Docker будет предложено установить расширение Docker для VS Code.

Открываем проект Pizza (`Ctrl + K`, `Ctrl + O`).

### Устанавливаем Pre-commit

Смотрите [по этой ссылке](https://pre-commit.com/#installation).

В терминале VS Code открываем (добавляем) новую оболочку Ubuntu-18.04 (WSL).

Установить пакет локально:

```
sudo -H pip3 install pre-commit
```

Проверить установку можно командой:

```
pre-commit --version
```

Выполнить команду:

```
pre-commit install
```

Результат: `pre-commit installed at .git/hooks/pre-commit` - после этого каждый коммит будет проверять правила линтинга и править ошибки

### Установка Frontend

В терминале VS Code переключаемся на оболочку PowerShell.

* Перейти в директорию `cd src/frontend`
* Установить зависимости `npm install`

### Установка Backend

В терминале VS Code в оболочке PowerShell:

* Вернуться в корневой каталог проекта `cd ../..`
* Перейти в директорию `cd src/backend`
* Установить зависимости `npm install`
* Вернуться в корневой каталог проекта `cd ../..`

### Docker установка проекта

В терминале VS Code в оболочке PowerShell:

* Выполнить команду `docker-compose build`

В терминале VS Code переключаемся на оболочку Ubuntu-18.04 (WSL):

* Запустить проект с помощью команды `make start_project`
* Для остановки нажать `Ctrl + C`

### Запуск и просмотр готовой вёрстки проекта

В терминале VS Code переключаемся на оболочку PowerShell:

* Находясь в корневом каталоге проекта, перейдите в директорию template: `cd template`
* Установите зависимости, выполнив команду `npm install`
* Запустите проект командой `npm start`
