export const GET = "GET";
export const EUR = "EUR";
export const USD = "USD";
export const RUB = "RUB";
export const USD_VALUE = "$";
export const EUR_VALUE = "€";
export const RUB_VALUE = "₽";
export const URL = `http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}`;
export const headers = [
    "Transaction ID",
    "User Info",
    "Order Date",
    "Order Amount",
    "Card Number",
    "Card Type",
    "Location",
];
export const financeList = [
    "USD",
    "RUB",
    "EUR",
    "NZD",
    "AUD",
    "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "MXN",
    "CZK",
    "DKK",
    "GBP",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "MYR",
    "NOK",
    "PHP",
    "PLN",
    "RON",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "ZAR",
];
export const options = {
    url: "/api/users",
    type: GET,
    contentType: "application/json",
};
