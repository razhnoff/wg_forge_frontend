// this is an example of improting data from JSON
import orders from '../data/orders.json';
import { isActive, userInfo, dateConvert, cardConvert, orderCount, average, totalCheck, femaleAvgCheck, maleAvgCheck, mediana } from '../components/helpers.js';
import { sortAmount, sortTransaction, sortDate, sortCardType, sortUser, sortLocation } from '../components/sorters.js';
import users from '../data/users.json';
import { get } from 'https';


// let xhr = new XMLHttpRequest();
const url = `https://api.exchangeratesapi.io/latest`;
// xhr.open("GET", url, false);
// xhr.send();
// let response = JSON.parse(xhr.response);
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
const newListOrders = [...orders];
const newListUsers = [...users];

export default (function () {
    createTemplate(orders);
    // YOUR CODE GOES HERE
    // next line is for example only
    function createTemplate(propsOrders, event) {

        document.getElementById("app").innerHTML =
            `<table class="table table-dark table-bordered table-hover">
        <thead>
            <tr>
                <th>Search:</th>
                <th colspan="2">
                    <input type="text" class="form-control" id="search" placeholder="Enter user info, date,location, card type, order amount or transaction id" title="Enter user info, date,location, card type, order amount or transaction id">
                </th>
                <th>Convert Money: </th>
                <th>
                    <select class="form-control form-control-sm" title="Convert money">
                        `+ converterList(financeList) + `
                    </select>
                </th>
            </tr>
            <tr>
                ` + createHeaders(headers, event) +
            `
            </tr>
        </thead >`
            + tbody(propsOrders) +
            `</table >`;
        listeners();

    }



    function tbody(propsOrders) {
        return (`<tbody>` + table(propsOrders) + statistics(propsOrders) +
            `</tbody>`);
    }

    function listeners() {
        for (let i = 0; i < headers.length; i++) {
            if (i !== 4) {
                document.getElementsByTagName("thead")[0].children[1].children[i].addEventListener("click", (eventClick) => {
                    if (eventClick.currentTarget.id === "header_0") {
                        if (sortedBy != eventClick.currentTarget.id) {
                            sortedBy = eventClick.currentTarget.id;
                            createTemplate(newListOrders.sort(sortTransaction), eventClick);

                        }
                        else if (sortedBy == eventClick.currentTarget.id) {
                            createTemplate(orders);
                            sortedBy = null;
                        }
                    }
                    if (eventClick.currentTarget.id === "header_1") {
                        if (sortedBy != eventClick.currentTarget.id) {
                            sortedBy = eventClick.currentTarget.id;
                            createTemplate(sortUser(newListOrders, newListUsers), eventClick);
                        }
                        else if (sortedBy == eventClick.currentTarget.id) {
                            createTemplate(orders);
                            sortedBy = null;
                        }
                    }
                    if (eventClick.currentTarget.id === "header_2") {
                        if (sortedBy != eventClick.currentTarget.id) {
                            sortedBy = eventClick.currentTarget.id;
                            createTemplate(newListOrders.sort(sortDate), eventClick);
                        }
                        else if (sortedBy == eventClick.currentTarget.id) {
                            createTemplate(orders);
                            sortedBy = null;
                        }

                    }
                    if (eventClick.currentTarget.id === "header_3") {
                        if (sortedBy != eventClick.currentTarget.id) {
                            sortedBy = eventClick.currentTarget.id;
                            createTemplate(newListOrders.sort(sortAmount), eventClick);
                        }
                        else if (sortedBy == eventClick.currentTarget.id) {
                            createTemplate(orders);
                            sortedBy = null;
                        }
                    }
                    if (eventClick.currentTarget.id === "header_5") {
                        if (sortedBy != eventClick.currentTarget.id) {
                            sortedBy = eventClick.currentTarget.id;
                            createTemplate(newListOrders.sort(sortCardType), eventClick);
                        }
                        else if (sortedBy == eventClick.currentTarget.id) {
                            createTemplate(orders);
                            sortedBy = null;
                        }
                    }
                    if (eventClick.currentTarget.id === "header_6") {
                        if (sortedBy != eventClick.currentTarget.id) {
                            sortedBy = eventClick.currentTarget.id;
                            createTemplate(newListOrders.sort(sortLocation), eventClick);
                        }
                        else if (sortedBy == eventClick.currentTarget.id) {
                            createTemplate(orders);
                            sortedBy = null;
                        }
                    }
                })
            }
        }

        const userDetailInfo = [...document.getElementsByClassName("user-details")];
        const userData = [...document.getElementsByClassName("user_data")];
        userData.forEach((item, i, userData) => {
            userData[i].children[0].addEventListener("click", (event) => {
                event.preventDefault();
                isActive(userDetailInfo[i]);
            });
        });



        const select = [...document.getElementsByTagName("select")][0];
        select.addEventListener("change", (event) => {
            //console.log(true)
            //selectCurrency = event.currentTarget.value;
            //console.log(event.currentTarget.value)
            //console.log(newListOrders)

            convert(newListOrders, event)
            createTemplate(newListOrders);

        })
        select.value = selectCurrency;

    }





    const txtPhrase = document.getElementById("search");
    txtPhrase.addEventListener("keyup", () => {
        //console.log(5)
        // let regPhrase = new RegExp(txtPhrase.value, 'i');
        // let flag = false;
        // newListOrders.map((item) => {
        //     flag = regPhrase.test(+item.total)
        //     if (flag) {
        //        console.log(item)
        //         return item;
        //     }


        // })

        // console.log(txtPhrase.value)

    });














    function table(props) {
        //console.log(props)
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
        )).join('')
    }

    function moneyConvert(props) {
        return (`${moneySymbol()} ${props.total}`);
    }
}());


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
    for (let key in rates) {
        if (selectCurrency === key) {
            props.map((order) => {
                order.total = (order.total / rates[key]).toFixed(2);
            });
        }
    }
    selectCurrency = event.currentTarget.value;
    if (selectCurrency !== 'EUR') {
        for (let key in rates) {
            if (selectCurrency === key) {
                props.map((order) => {
                    order.total = (order.total * rates[key]).toFixed(2);
                });
            }
        }
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

    })
}
function createHeaders(props, eventClick) {
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
    return `<tr>
        <td colspan="3">Orders Count</td>
         <td colspan="4">`+ orderCount(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Orders Total</td>
        <td colspan="4">${moneySymbol()}` + totalCheck(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Median Value</td>
        <td colspan="4">${moneySymbol()}` + mediana(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check</td>
        <td colspan="4">${moneySymbol()}` + average(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check (Female)</td>
        <td colspan="4">${moneySymbol()}` + femaleAvgCheck(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check (Male)</td>
        <td colspan="4">${moneySymbol()}` + maleAvgCheck(propsOrders) + `</td>
    </tr>`
}


















function tableSearch() {
    const txtPhrase = document.getElementById("search");
    let table = document.getElementsByTagName("table")[0];
    let tbody = document.getElementsByTagName("tbody")[0];
    let regPhrase = new RegExp(txtPhrase.value, 'i');
    let flag = false;
    let mas = [];
    // for (let i = 0; i < table.rows.length - 8; i++) {
    //     flag = false;
    //     flag = regPhrase.test(table.rows[i].cells[3].innerHTML);
    //     //mas.push(tbody.children[i].remove())
    //     if (flag) {
    //         table.rows[i].style.display = "";
    //     }
    //     else {

    //         //table.rows[i].style.display = "none";
    //     }
    //}
}
