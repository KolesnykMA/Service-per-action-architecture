# Node.js Service-per-Action Architecture 👾

## Setup:
### 1. Configure MySQL database
1. Install MySQL
2. Login to MySQL
3. Create database
``` 
mysql> CREATE DATABASE db_name; 
```
4. Create new user:
``` 
mysql> CREATE USER 'db_user'@'%' IDENTIFIED BY 'db_user_password'; 
```
5. Grant all privileges to new user:
``` 
mysql> GRANT ALL PRIVILEGES ON `db_name`.* to 'db_user'@'%'; 
```
### 2. Start Node.js server
1. Install Node.js
2. Go to main project folder
3. ``` npm intsall ```
4. ``` npm run start ```

