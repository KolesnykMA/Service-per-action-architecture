# Node.js Service-per-Action Architecture 👾
This project is example of using Vikor Turskiy (https://github.com/koorchik) approach for building Node.js backend services

## Setup:
### 1. Configure MySQL database
1. Install MySQL
2. Login to MySQL
3. Create database
``` 
mysql> CREATE DATABASE spaa; 
```
4. Create new user:
``` 
mysql> CREATE USER 'spaa_user'@'%' IDENTIFIED BY 'spaa_user_password'; 
```
5. Grant all privileges to new user:
``` 
mysql> GRANT ALL PRIVILEGES ON `spaa`.* to 'spaa_user'@'%'; 
```
### 2. Start Node.js server
1. Install Node.js
2. Cd to main project folder
3. ``` npm intsall ```
4. ``` npx sequelize-cli db:migrate ```
5. ``` npm run start ```

Swagger:
http://localhost:5000/api-docs/

