Interview Helper
------------------------
[Live Demo](https://test.webtech.by/interview/#/) - v0.1


1.Set up environment.
------------------------

Run `npm i` for install all packages

2.End-2-end testing
------------------------

Testing is organized using Webdriver.io
To execute test cases you need:

1. npm run e2e-setup (to install drivers for chrome and FF)
2. npm run selenium-server
3. npm run e2e (wdio tests/e2e/wdio.conf.js)

3.API
------------------------
This app is using interview api developed by using PHP and Mysql. 
Right now API located [here](http://project.webtech.by/)
Ability to add new positions/questions/themes/topics available only for admin.
