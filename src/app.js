// this is an example of improting data from JSON
import orders from '../data/orders.json';
import { isActive, userInfo, dateConvert, cardConvert, average, totalCheck, orderCount, femaleAvgCheck, maleAvgCheck, mediana } from '../components/helpers.js';
import moneyConvert from '../components/converter/converter';



export default (function() {
    // YOUR CODE GOES HERE
    // next line is for example only
    document.getElementById("app").innerHTML = 
    `<table class="table table-dark table-bordered table-hover">
        <thead>
            <tr>
                <th>Search:</th>
                <th colspan="2">
                    <input type="text" id="search">
                </th>
                <th>Convert Money: </th>
                <th>
                    <select>
                        <option>`+ moneyConvert(orders) +`</option>
                        <option>123</option>
                        <option>123</option>
                        <option>123</option>
                        <option>123</option>
                        <option>123</option>
                    </select>
                </th>
            </tr>
            <tr>
                <th scope=col style="cursor:pointer" id="transactionId">Transaction ID</th>
                <th scope=col style="cursor:pointer" id="userInfo">User Info</th>
                <th scope=col style="cursor:pointer" id="orderDate">Order Date</th>
                <th scope=col style="cursor:pointer" id="orderAmount">Order Amount</th>
                <th scope=col>Card Number</th>
                <th scope=col style="cursor:pointer" id ="cardType">Card Type</th>
                <th scope=col style="cursor:pointer" id="location">Location</th>
            </tr>
        </thead >
         <tbody>`+ orders.map((item, i, orders) => (
            `<tr id=order_${orders[i].id}>
                <td>${orders[i].transaction_id}</td>
                <td class=user_data>${userInfo(orders[i].user_id)}</td>
                <td>${dateConvert(orders[i])}</td>
                <td>$${orders[i].total}</td>
                <td>${cardConvert(orders[i].card_number)}</td>
                <td>${orders[i].card_type}</td>
                <td>${orders[i].order_country} (${orders[i].order_ip})<td>
            </tr>`
        )).join('') + statistics() +
        `</tbody>
    </table >`;

    function statistics() {
        return `<tr>
            <td colspan="3">Orders Count</td>
             <td colspan="4">`+ orderCount(orders) + `</td>
        </tr>
        <tr>
            <td colspan="3">Orders Total</td>
            <td colspan="4">$`+ totalCheck(orders) + `</td>
        </tr>
        <tr>
            <td colspan="3">Median Value</td>
            <td colspan="4">$` + mediana(orders) + `</td>
        </tr>
        <tr>
            <td colspan="3">Average Check</td>
            <td colspan="4">$` + average(orders) + `</td>
        </tr>
        <tr>
            <td colspan="3">Average Check (Female)</td>
            <td colspan="4">$` + femaleAvgCheck(orders) + `</td>
        </tr>
        <tr>
            <td colspan="3">Average Check (Male)</td>
            <td colspan="4">$`+ maleAvgCheck(orders) + `</td>
        </tr>`;
    }
}());

const orderAmount = document.getElementById("orderAmount");
console.log(orderAmount)
orderAmount.addEventListener("click", () => {
    orderAmount.innerText += span();
})
function span() {
    return `<span>&#8595;</span>`;
}

const userDetailInfo = [...document.getElementsByClassName("user-details")];
const userData = [...document.getElementsByClassName("user_data")];
userData.forEach((item, i, userData) => {
    userData[i].children[0].addEventListener("click", (event) => {
        event.preventDefault();
        isActive(userDetailInfo[i]);
    });
});


