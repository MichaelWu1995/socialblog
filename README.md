# Project: My Social Community

## 1. Project Description

My Social Community is social blog website. Within this website, the signed-in users can share different topics with each other. Also, they can comment other topics. The topics are categorised into sports, movie, diet, tourism and others respectively. The project idea is from https://cnodejs.org/.

## 2. Project setup

This project is developed using node.js, express, Mongodb and so on. If you want to use this website, you can follow the steps below:

1. Install the dependencies package:

   ```markdown　
   $ npm install
   ```

2. Start the Mongodb:

   ```markdown
   $ sudo mongod
   ```

   The installation of Mongodb, please reference the Mongodb Official document: https://docs.mongodb.com/manual/administration/install-community/

3. Run the application:

   ```markdown
   $ node app.js
   ```

4. View in the browser:

   ```markdown
   localhost:5000
   ```

   or

   ```markdown
   127.0.0.1:5000
   ```

## 3. Technology Stack

1. Node.js
2. Express
3. Mongodb
4. Mongoose.js
5. Art-template
6. JQuery
7. Bootstrap

## 4. Project structure

```markdown
    |-- .DS_Store
    |-- .gitignore
    |-- README.md
    |-- app.js
    |-- multer.js
    |-- package-lock.json
    |-- package.json
    |-- models
    |   |-- comment.js
    |   |-- mongoose.js
    |   |-- topic.js
    |   |-- user.js
    |-- public
    |   |-- .DS_Store
    |   |-- css
    |   |   |-- login.css
    |   |   |-- main.css
    |   |   |-- settings.css
    |   |-- img
    |   |   |-- avatar-default.png
    |   |   |-- diet.png
    |   |   |-- error.png
    |   |   |-- favicon.ico
    |   |   |-- logo.png
    |   |   |-- movie.png
    |   |   |-- others.png
    |   |   |-- sorry.jpg
    |   |   |-- sports.png
    |   |   |-- topic.png
    |   |   |-- tourism.png
    |   |   |-- uploads
    |   |-- js
    |       |-- pagination.js
    |-- routes
    |   |-- account.js
    |   |-- comment.js
    |   |-- home.js
    |   |-- topic.js
    |-- views
        |-- .DS_Store
        |-- 404.html
        |-- index.html
        |-- login.html
        |-- register.html
        |-- _layouts
        |   |-- home.html
        |-- _partials
        |   |-- footer.html
        |   |-- form_alert.html
        |   |-- header.html
        |   |-- modal.html
        |   |-- search_alert.html
        |   |-- settings-nav.html
        |   |-- success_alert.html
        |   |-- topic-nav.html
        |-- settings
        |   |-- admin.html
        |   |-- profile.html
        |-- topic
            |-- edit.html
            |-- new.html
            |-- show.html
```

## 5. Routes

|           Path            | Type | Get parameter |                  Post parameter                  | Need Login? |         Remark          |
| :-----------------------: | :--: | :-----------: | :----------------------------------------------: | :---------: | :---------------------: |
|             /             | GET  |               |                                                  |     No      |    Render Index.html    |
|             /             | POST |               |                      Title                       |             |  Autocomplete request   |
|           /home           | GET  |               |                                                  |     No      |    Render index.htm     |
|          /search          | POST |               |                      Title                       |             |  Search topic request   |
|     /account/register     | GET  |               |                                                  |     No      |  Render register.html   |
|     /account/register     | POST |               |            email, nickname, password             |             |    Register request     |
|      /account/login       | GET  |               |                                                  |     No      |    Render login.html    |
|      /account/login       | POST |               |                 email, password                  |             |      Login request      |
|      /account/logout      | GET  |               |                                                  |     Yes     |     Logout request      |
| /account/settings/profile | GET  |               |                                                  |     Yes     |   Render profile.html   |
| /account/settings/profile | POST |               |     nickname, avatar, gender, bio, birthday      |             | Update profile request  |
|  /account/settings/admin  | GET  |               |                                                  |     Yes     |  Render admin profile   |
|  /account/settings/admin  | POST |               | Current_password, new_password, confirm_password |             | Change password request |
|      /account/delete      | GET  |               |                                                  |     Yes     | Delete account request  |
|           /all            | GET  |  Page number  |                                                  |     No      |    Render index.html    |
|          /sports          | GET  |  Page number  |                                                  |     No      |    Render index.html    |
|           /diet           | GET  |  Page number  |                                                  |     No      |    Render index.html    |
|          /movie           | GET  |  Page number  |                                                  |     No      |    Render index.html    |
|         /tourism          | GET  |  Page number  |                                                  |     No      |    Render index.html    |
|          /others          | GET  |  Page number  |                                                  |     No      |    Render index.html    |
|        /topic/new         | GET  |               |                                                  |     Yes     |     Render new.html     |
|        /topic/new         | POST |               |         catergory, image, title, content         |             |  Create topic request   |
|        /topic/:id         | GET  |      Id       |                                                  |     No      |    Render show.html     |
|      /topic/edit/:id      | GET  |      Id       |                                                  |     Yes     |    Render edit.html     |
|      /topic/edit/:id      | POST |               |                  title, content                  |             |   Edit topic request    |
|     /topic/delete/:id     | GET  |      Id       |                                                  |     Yes     |  Delete topic request   |
|          Others           | GET  |               |                                                  |     No      |     Render 404.html     |

