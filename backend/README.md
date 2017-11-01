## How to run database
---
I assume you already have MongoDB and Node installed on your machine

* Clone this branch (database-ju) to your local machine

* If you don't have a MongoDB data visualization tool, you may want to download **Robo 3T (https://robomongo.org/)**, or you could use 
**mLab (https://mlab.com/)** as you wish.

* In you termianl, cd to Destime directory

* type command: **npm install**

* If you are using Robo T3 as data visualization tool, you are good to go, if you are using mLab, you may want to change all connect urls
in backedn/schemas/*.js to your target sever url.

* Then cd to backend directory

* Type command: **node server.js**, the termial should show you "User Created! Production Created! Team Created! Recommendation Created! Product Created!"

* Then, you should be able to see a rough test database in no matter Robo T3 or mLab.
