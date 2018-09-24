# Insurance
Simple Insurance App to based on some criterias use Express JS

## Usage
1. Clone the repository or download and extract it
2. Run by doing
```
insurance $ npm install
```
3. Start by doing
```
insurance $ nodemon index.js
```

## Assumptions
1. Insurance has list airline names, flight numbers, date of flights, passengers used it and according to price insurance that would be given.
2. Get insurance price should use airline name, flight number, and date of flight to get specific price.
3. Use insurance id to get descriptions, term and conditions. It could use to confirmation payment API.
4. Create order (From client) use insurance id, username to send to server.