# EazyPayouts Dashboard (Assignment)

This assignment is a single‑page dashboard that lists companies, accounts, balances, and transactions. The UI is built with plain HTML/CSS/JavaScript and pulls data from a MockAPI backend.

## What Works

- Dashboard loads and renders data from the MockAPI endpoint
- Company dropdown filters accounts for that company
- Account dropdown shows transactions for the selected account
- Balance card updates based on the current selection
- Empty states display when no data is available

## What is out of the assignment's scope

- Sidebar items (Loads, Transactions, Statements) are static and do not navigate
- Logout button is not wired to any action
- The local API in `server.js` and `data.json` are not used by the frontend
- `styles.css` exists but the page uses inline styles instead

## How to Run

You must serve the app over HTTP (opening the HTML file directly will block `fetch()` requests).

1) Install dependencies:
   ```
   npm install
   ```
2) Start the server:
   ```
   npm start
   ```
3) Open the app:
   ```
   http://localhost:3000
   ```

## Data Source

The frontend fetches data from:
```
https://6916f911a7a34288a27f15b7.mockapi.io/eazypayouts/api/v1/balance
```
If that API is unavailable or blocked, the dashboard will not show data.

## Project Structure

```
public/index.html   Main UI
public/app.js       API calls and DOM rendering
public/styles.css   Unused stylesheet (styles are inline)
server.js           Static server + local API (unused by frontend)
data.json           Local data for the server API (unused by frontend)
```

## Notes

This is an assignment project meant for demonstration and learning purposes.
