// this is an example of improting data from JSON
import orders from '../data/orders.json';
import { isActive, userInfo, dateConvert, cardConvert, orderCount, average, totalCheck, femaleAvgCheck, maleAvgCheck, mediana } from '../components/helpers.js';
import { sortAmount, sortTransaction, sortDate, sortCardType, sortUser, sortLocation } from '../components/sorters.js';
import users from '../data/users.json';
//import { get } from 'https';



const url = `https://api.exchangeratesapi.io/latest`;

let rates = {};
let selectCurrency = 'USD';

let sortedBy = null;



fetch(url, {
    method: 'GET'
})
    .then((response) => {
        response.json(url).then((data) => {
            rates = data.rates;
        })
    })
    .catch((error) => {
        console.log("Error on load rates: " + error)
    })

const headers = ["Transaction ID", "User Info", "Order Date", "Order Amount", "Card Number", "Card Type", "Location"];
const financeList = ["USD", "RUB", "EUR", "NZD", "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "MXN", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MYR", "NOK", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "ZAR"];
let searched;
let newListOrders = [...orders];
const newListUsers = [...users];

export default (function () {
    createSelectTemplate(financeList);
    createHeadTemplate(headers);
    createTemplate(orders);
    // YOUR CODE GOES HERE
    // next line is for example only
    function createSelectTemplate(finList) {
        document.getElementById("app").innerHTML =
            (`<table class="table table-dark table-bordered table-hover">
        <thead>
            <tr>
                <th>Search:</th>
                <th colspan="4">
                    <input type="text" class="form-control" id="search" placeholder="Enter user info, date, location, card type, order amount or transaction id" title="Enter user info, date, location, card type, order amount or transaction id">
                </th>
                <th>Convert Money: </th>
                <th>
                    <select class="form-control form-control-sm" title="Convert money">
                        `+ converterList(finList) + `
                    </select>
                </th>
            </tr>
        </thead>
        </table >`);
    }

    function createHeadTemplate(tableHeaders, event) {
        const theadRow = document.getElementsByTagName("thead")[0];
        if (theadRow.children[1]) {
            theadRow.children[1].remove();
        }
        let newTableRow = document.createElement("tr");
        newTableRow.innerHTML = createHeaders(tableHeaders, event);
        theadRow.appendChild(newTableRow);
        listeners();
    }


    function createTemplate(propsOrders) {
        const tbody = document.getElementsByTagName("tbody")[0];
        if (tbody) {
            tbody.remove();
        }
        let newTbody = document.createElement('tbody');
        newTbody.innerHTML = table(propsOrders) + statistics(propsOrders);
        document.getElementsByTagName("table")[0].appendChild(newTbody);
        listenerUserInfo();
    }

    function listeners() {
        for (let i = 0; i < headers.length; i++) {
            if (i !== 4) {
                document.getElementsByTagName("thead")[0].children[1].children[i].addEventListener("click", handlerSort);
            }
        }
    }

    function sortAction(func) {
        switch (func) {
            case 'header_0':
                return sortTransaction;
            case 'header_2':
                return sortDate
            case 'header_3':
                return sortAmount
            case 'header_5':
                return sortCardType
            case 'header_6':
                return sortLocation;
        }
    }

    function handlerSort(event) {
        if (event.currentTarget.id !== "header_1") {
            if (sortedBy != event.currentTarget.id) {
                sortedBy = event.currentTarget.id;
                createHeadTemplate(headers, event);
                createTemplate(newListOrders.sort(sortAction(sortedBy)));
            }
            else if (sortedBy == event.currentTarget.id) {
                createHeadTemplate(headers);
                createTemplate(orders);
                sortedBy = null;
            }
        } else {
            if (sortedBy != event.currentTarget.id) {
                sortedBy = event.currentTarget.id;
                createHeadTemplate(headers, event);
                createTemplate(sortUser(newListOrders, newListUsers), event);
            }
            else if (sortedBy == event.currentTarget.id) {
                createHeadTemplate(headers);
                createTemplate(orders);
                sortedBy = null;
            }
        }
    }


    const select = [...document.getElementsByTagName("select")][0];
    select.addEventListener("change", (event) => {
        if (sortedBy == null) {
            newListOrders = [...orders];
            //debugger
            convert(newListOrders, event);
            createTemplate(newListOrders);
        }
        else {
            convert(newListOrders, event);
            createTemplate(newListOrders);
        }
    })
    select.value = selectCurrency;



    const txtPhrase = document.getElementById("search");
    txtPhrase.addEventListener("keyup", () => {
        let regPhrase = new RegExp(txtPhrase.value, 'i');
        console.log(txtPhrase.value)
        //debugger
        newListOrders = [...orders].filter((order) => {
            return regPhrase.test(order.total) ? order : null;
        })
        // if (txtPhrase.value) {
        //     console.log(true)
        //     newListOrders = searched
        // }
        // else {
        //     console.log(false)
        // }
        createTemplate(newListOrders);
    });







    function listenerUserInfo() {
        const userDetailInfo = [...document.getElementsByClassName("user-details")];
        const userData = [...document.getElementsByClassName("user_data")];

        userData.forEach((item, i, userData) => {
            userData[i].children[0].addEventListener("click", (event) => {
                event.preventDefault();
                isActive(userDetailInfo[i]);
            });
        });
    }

    function table(props) {
        if (props.length > 0) {
            return props.map((item, i, props) => (
                `<tr id=order_${props[i].id}>
                <td>${props[i].transaction_id}</td>
                <td class=user_data>${userInfo(props[i].user_id)}</td>
                <td>${dateConvert(props[i])}</td> 
                <td>${moneyConvert(props[i])}</td>
                <td>${cardConvert(props[i].card_number)}</td>
                <td>${props[i].card_type}</td>
                <td>${props[i].order_country} (${props[i].order_ip})<td>
            </tr>`
            )).join('');
        }
        else {
            return (`<tr>
                <td colspan="7" class="text-center">Nothing found</td>
            </tr>`);
        }
    }

}());

function moneyConvert(props) {
    return (`${moneySymbol()} ${props.total}`);
}

function moneySymbol() {
    if (selectCurrency === 'USD') {
        return (`$ `);
    }
    if (selectCurrency === 'EUR') {
        return (`€ `);
    }
    if (selectCurrency === 'RUB') {
        return (`₽ `);
    }
    else {
        return (`${selectCurrency} `);
    }
}

function convert(props, event) {
    if (selectCurrency !== 'EUR') {
        props.map((order) => {
            order.total = (order.total / rates[selectCurrency]).toFixed(2);
        });
    }
    selectCurrency = event.currentTarget.value;
    if (selectCurrency !== 'EUR') {
        props.map((order) => {
            order.total = (order.total * rates[selectCurrency]).toFixed(2);
        });
        return props
    }
    else {
        return props;
    }
}

function converterList(financeList) {
    return financeList.map((item) => {
        if (item === "USD" || item === "EUR" || item === "RUB") {
            return (`<option style="font-weight: bold" value="${item}">${item}</option>`);
        }
        else {
            return (`<option value="${item}">${item}</option>`);
        }
    });
}
function createHeaders(props, eventClick) {
    //debugger
    if (eventClick !== undefined) {
        if (eventClick.target.cellIndex === 0) {
            return props.map((item, i) => {
                if (item !== props[4] && i === 0) {
                    return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                }
                else {
                    if (item !== props[4]) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item}</th>`);
                    }
                    else {
                        return (`<th id="header_${i}">${item}</th>`);
                    }
                }
            }).join('');
        }
        if (event.target.cellIndex === 1) {
            return props.map((item, i) => {
                if (item !== props[4] && i === 1) {
                    return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                }
                else {
                    if (item !== props[4]) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item}</th>`);
                    }
                    else {
                        return (`<th id="header_${i}">${item}</th>`);
                    }
                }
            }).join('');
        }
        if (event.target.cellIndex === 2) {
            return props.map((item, i) => {
                if (item !== props[4] && i === 2) {
                    return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                }
                else {
                    if (item !== props[4]) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item}</th>`);
                    }
                    else {
                        return (`<th id="header_${i}">${item}</th>`);
                    }

                }
            }).join('');
        }
        if (event.target.cellIndex === 3) {
            return props.map((item, i) => {
                if (item !== props[4] && i === 3) {
                    return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                }
                else {
                    if (item !== props[4]) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item}</th>`);
                    }
                    else {
                        return (`<th id="header_${i}">${item}</th>`);
                    }
                }
            }).join('');
        }
        if (event.target.cellIndex === 5) {
            return props.map((item, i) => {
                if (item !== props[4] && i === 5) {
                    return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                }
                else {
                    if (item !== props[4]) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item}</th>`);
                    }
                    else {
                        return (`<th id="header_${i}">${item}</th>`);
                    }
                }
            }).join('');
        }
        if (event.target.cellIndex === 6) {
            return props.map((item, i) => {
                if (item !== props[4] && i === 6) {
                    return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                }
                else {
                    if (item !== props[4]) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item}</th>`);
                    }
                    else {
                        return (`<th id="header_${i}">${item}</th>`);
                    }
                }
            }).join('');
        }
    }
    return props.map((item, i) => {
        if (item !== props[4]) {
            return (`<th style="cursor:pointer" id="header_${i}">${item}</th>`);
        }
        else {
            return (
                `<th id="header_${i}">${item}</th>`
            );
        }
    }).join('');
}

function statistics(propsOrders) {
    if (propsOrders.length > 0) {
        return `<tr>
        <td colspan="3">Orders Count</td>
         <td colspan="4">` + orderCount(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Orders Total</td>
        <td colspan="4">` + moneySymbol() + totalCheck(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Median Value</td>
        <td colspan="4">` + moneySymbol() + mediana(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check</td>
        <td colspan="4">`+ moneySymbol() + average(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check (Female)</td>
        <td colspan="4">`+ moneySymbol() + femaleAvgCheck(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check (Male)</td>
        <td colspan="4">`+ moneySymbol() + maleAvgCheck(propsOrders) + `</td>
    </tr>`;
    } else {
        return (`<tr>
        <td colspan="3">Orders Count</td>
         <td colspan="4">n/a</td>
    </tr>
    <tr>
        <td colspan="3">Orders Total</td>
        <td colspan="4">n/a</td>
    </tr>
    <tr>
        <td colspan="3">Median Value</td>
        <td colspan="4">n/a</td>
    </tr>
    <tr>
        <td colspan="3">Average Check</td>
        <td colspan="4">n/a</td>
    </tr>
    <tr>
        <td colspan="3">Average Check (Female)</td>
        <td colspan="4">n/a</td>
    </tr>
    <tr>
        <td colspan="3">Average Check (Male)</td>
        <td colspan="4">n/a</td>
    </tr>`);
    }
}