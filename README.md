# Phonebook UI

Phonebook UI application created with ReactJS, Redux & PHP. 

![Phonebook UI preview](https://apps.coffeedzic.com/phonebook/preview.png)

## Live application

[apps.coffeedzic.com/phonebook](https://apps.coffeedzic.com/phonebook)

If you don't want to create contact log in with demo account:

- Email: test
- Password: test

## Features

- Register
- Login
- Add contacts
- Edit contacts
- Delete contacts
- View contacts
- Search contacts

## Test it localy

1. Download files & extract it to local server
2. Create database & import database.sql
3. Set up your [database.class.php](https://github.com/coffeedzic/phonebook/blob/main/public/api/classes/database.class.php)

```php
private $databaseHost = 'Your server host...';
private $databaseUser = 'Your database username here...';
private $databasePassword = 'Your database password here...';
private $databaseName = 'Your database name...';
private $port = 'Leave if empty for now...';
```
4. Install dependencies
```
npm install
```
5. Start project
```
npm start
```
6. Create build
```
npm build
```

## License

Phonebook UI is licensed under the [MIT](https://github.com/coffeedzic/phonebook/blob/main/LICENSE) license.
