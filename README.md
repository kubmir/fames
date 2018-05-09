# Fames

This project's app shows listing of restaurants and their respective daily meals.

### How to start developing
1.  Install Node.js and npm.
2.  (Optional) Install and use Visual Studio Code (VS Code).
4.  Create account on https://www.zomato.com and generate your API key (https://developers.zomato.com/api).
5.  Either
      * Create environment variable **ZOMATO_USER_KEY** and set its value to Zomato API key.
      * Or open `./src/server/server.ts`, find string 'PUT YOUR USER KEY HERE' and replace it with the Zomato API key.
6.  Run `npm install -g gulp-cli` to run gulp scripts from command prompt.
7.  Start the app with `npm run start-dev` and it will be available at http://localhost:5001/ (initialization of solution, gulp and start of node server is performed)

### Tips:
 - Press CTRL+SHIFT+B inside VS Code to build server and client side code.
 - Press F5 inside VS Code to build code and start debug session.
 - Environment is configured to generate source maps for both server and client side so you can debug TypeScript code directly from VS Code and browser.

### How to run app locally
1.  Start the app with `npm run start-dev` and it will be available at http://localhost:5001/

### How to publish Fames to Azure
1.  Continuous deployment is set up on Azure - every commit to master branch will trigger release
2.  If you want to set-up continuous deployment for new resource group 
	  * Change build script in KUDU deployment folder for build script stored in the repository (azure_deployment.cmd)
	  * Set default document to public\index.html in default documents section of app service's application settings
	  * Set ZOMATO_USER_KEY in application settings section of app service's application setting