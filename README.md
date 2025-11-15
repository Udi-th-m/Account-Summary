# EazyPayouts Dashboard

This project is a simple dashboard built using HTML, CSS, and JavaScript. It loads companies, accounts, balances, and transactions from a MockAPI backend and displays them in a clean UI.

## How to Run the Project

This project uses a small Node.js server. Opening the HTML file directly will not work because `fetch()` requests must be served over HTTP.

Follow these steps:

1. Install Node.js  
   https://nodejs.org/

2. Open a terminal in the project directory  
   Example:
   ```
   cd path/to/project
   ```

3. Install dependencies  
   If there is a `package.json` file in the project, run:
   ```
   npm install
   ```

4. Start the server  
   ```
   node server.js
   ```

5. Open the application in the browser  
   ```
   http://localhost:3000
   ```

## API Used

Base URL:
```
https://6916f911a7a34288a27f15b7.mockapi.io/eazypayouts/api/v1/balance
```

Endpoints:
```
GET /companies
GET /Account
```

The app loads all accounts on startup and displays their combined transactions by default.  
Selecting a company filters accounts by `companyId`.  
Selecting an account shows transactions for that account only.

## Project Structure

```
index.html        Main UI
app.js            API calls and DOM rendering
server.js         Lightweight Node server
logo.png          Project logo
README.md         Documentation
```