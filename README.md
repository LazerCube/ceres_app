Ceres app - Built with Typescript and Gulp
==========================================

App part of the Ceres project using Angular 2 with Gulp as a build system.

Prerequisites
-------------

- nodejs
- gulp and gulp-cli
- typings
- typescrit
- ts-node

Recommendation
--------------

*   [NVM](https://github.com/creationix/nvm) - Use Node Version Manager to manage node.js and npm.


Running
-------

Clone the repository:

> git clone

Navigate to `ceres_app` directory:

> cd ceres_app

Install dependencies:

> npm install

`node_modules` and `typings` directories should be created during the install.

Build the project:

> npm run clean & npm run build

`build` directory should be created during the build

> npm start

The application should be displayed in the browser.

Todo
----

*   System to handle data requests and responses.

File Structure
--------------
```
ceres_app/
|
├── bootstrap/
|   ├── ...
|   
├── src/
|   ├── app/
|   |   ├── +users/
|   |   |   ├── user-profile/
|   |   |   |   ├── user-profile.component.ts|html|css|spec.ts
|   |   |   |   ├── index.ts
|   |   |   |
|   |   |   ├── shared/
|   |   |   |   ├── forms/
|   |   |   |   |   ├── login/
|   |   |   |   |   |   ├── user-login-form.component.ts|html|css|spec.ts
|   |   |   |   |   |   ├── index.ts
|   |   |   |   |   |
|   |   |   |   |   ├── register/
|   |   |   |   |   |   ├── user-register-form.component.ts|html|css|spec.ts
|   |   |   |   |   |   ├── index.ts
|   |   |   |   |   |
|   |   |   |   |   ├── index.ts
|   |   |   |   |
|   |   |   |   ├── user.model.ts
|   |   |   |   ├── user.service.ts|spec.ts
|   |   |   |   ├── index.ts
|   |   |   |
|   |   |   ├── users.component.ts|html|css|spec.ts
|   |   |   ├── index.ts
|   |   |
|   |   ├── shared/
|   |   |   ├── nav/
|   |   |   |   ├── nav.component.ts|html|css|spec.ts
|   |   |   |   ├── index.ts
|   |   |   |
|   |   |   ├── sidebar/
|   |   |   |   ├── sidebar.component.ts|html|css|spec.ts
|   |   |   |   ├── index.ts
|   |   |   |
|   |   |   ├── footer/
|   |   |   |   ├── footer.component.ts|html|css|spec.ts
|   |   |   |   ├── index.ts
|   |   |   |
|   |   |   ├── authorize.service.ts|spec.ts
|   |   |   ├── validation.service.ts|spec.ts
|   |   |   ├── control-message.component.ts|spec.ts
|   |   |   ├── index.ts
|   |   |
|   |   ├── app.component.ts|html|css|spec.ts
|   |
|   ├── css/
|   |   ├── bootstrap.css
|   |   
|   ├── main.ts
|   ├── index.html
|   ├── ...
|
├── ...
```
