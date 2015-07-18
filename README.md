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
Build the project
```
grunt
```
4.
Start the server
```
node server.js
```

You can now access the app by opening ```http://localhost:8100``` in a browser.

## Making changes
The grunt ```dev``` task handles changes to files and recompiles as needed. Get started with
```
grunt dev
```
This command will start the node server (```server.js```) and will also run the ```watch``` task. Simply open your browser and point it at ```http://localhost:8100```, make some changes to the project, and grunt will automatically recompile it for you.

LiveReload is also enabled, so if you have the plugin installed in your browser, just enable it and the page will automatically reload when something changes.