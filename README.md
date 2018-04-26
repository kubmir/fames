# Fames

This project's app shows listing of restaurants and their respective daily meals.

### How to start developing
1.  Install Node.js and npm.
2.  (Optional) Install and use Visual Studio Code (VS Code).
3.  Run `Initialize-Solution.ps1` (you will need Powershell 5 in order to successfully execute the script). `powershell ./Initialize-Solution.ps1`.
4.  Create account on https://www.zomato.com and generate your API key (https://developers.zomato.com/api).
5.  Either
      * Create environment variable **ZOMATO_USER_KEY** and set its value to Zomato API key.
      * Or open `./src/server/server.ts`, find string 'PUT YOUR USER KEY HERE' and replace it with the Zomato API key.
6.  (Optional) Run `npm install -g gulp-cli` if you want to run gulp scripts from command prompt (use VS Code otherwise).

### Tips:
 - Press CTRL+SHIFT+B inside VS Code to build server and client side code.
 - Press F5 inside VS Code to build code and start debug session.
 - Environment is configured to generate source maps for both server and client side so you can debug TypeScript code directly from VS Code and browser.

### How to run app locally
1.  Make sure your solution is initialized
2.  Run gulp script `gulpfile.js.`. With `gulp-cli` globally installed it is enough to just run `gulp` command from command line.
3.  Start the app with `npm run start` and it will be available at http://localhost:5001/

### How to publish Fames to Azure
1.  Either
      * (On target machine) Create environment variable **ZOMATO_USER_KEY** and set its value to Zomato API key.
      * Or set API key directly in code.
2.  Follow this article https://github.com/eliotstock/azure-content/blob/master/articles/app-service-web/web-sites-nodejs-develop-deploy-mac.md.
3.  Update `web.config` of deployed application to ensure IIS will look for static files in `dist` folder instead of `public`.
