# Task 3: Simple CRUD API

## To start

1. Install Node.js
2. Fork [this](https://github.com/lultik/simple-crud-api) repository
3. Clone your newly created repo: https://github.com/<%your_github_username%>/simple-crud-api/
4. Go to branch **develop**
5. Run command ```npm i```
6. You can use the following commands:
* To run app in **development mode** use the following command:
```
$ npm run start:dev
```

* To run app in **production mode** use the following command:
```
$ npm run start:prod
```

* To run **E2E tests** of app use the following command:
```
$ npm test
```

## API
API path `/person`:
* **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
* **POST** `/person` is used to create record about new person and store it in database
* **PUT** `/person/${personId}` is used to update record about existing person
* **DELETE** `/person/${personId}` is used to delete record about existing person from database

## Person object
Persons are stored as `objects` that have following properties:
* `id` — unique identifier (`string`, `uuid`) generated on server side
* `name` — person's name (`string`, **required**)
* `age` — person's age (`number`, **required**)
* `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
