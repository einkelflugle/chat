# Chat
by maxcmiller

## Build instructions
Follow the steps below to get chat up and running:

1.
Clone this repository into new directory 'chat'
```
git clone https://github.com/einkelflugle/chat.git
```
2.
Once in the 'chat' directory, install dependencies
```
npm install
```
3.
Install MongoDB and setup a MongoDB database.

If authentication is enabled, chat will try to login with the configured username and password (see next step).
4.
Modify the project's config to suit your needs.
Inside the ```config``` directory, you should create a file called ```config.js```, which contains variables specific to your environment.
Below is an example ```config.js``` file:
```javascript
var config = {
	socket_hostname: 'example.com', // the location of the node.js server
	socket_port: 8100, // the port which the client and server will use to communicate
	db_url: 'db.example.com', // the location of the MongoDB database
	db_username: 'chatClient', // the MongoDB username
	db_password: 'password' // the MongoDB password
}
```
If this file is not created, a set of default values will be used.
5.
Build the project
```
grunt
```
6.
Start the server (sudo privileges are needed for port 80 binding)
```
sudo node server.js
```

You can now access the app by opening ```http://localhost``` in a browser.

## Making changes
The grunt ```dev``` task handles changes to files and recompiles as needed. Get started with
```
sudo grunt dev
```
This command will start the node server (```server.js```) and will also run the ```watch``` task. Simply open your browser and point it at ```http://localhost```, make some changes to the project, and grunt will automatically recompile it for you.

LiveReload is also enabled, so if you have the plugin installed in your browser, just enable it and the page will automatically reload when something changes.