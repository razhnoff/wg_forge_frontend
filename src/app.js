// this is an example of improting data from JSON
import orders from '../data/orders.json';
import { isActive, userInfo, dateConvert, cardConvert, average, totalCheck, orderCount, femaleAvgCheck, maleAvgCheck, mediana } from '../components/helpers.js';
//import moneyConvert from '../components/converter/converter';


let mas = ["Transaction ID","User Info","Order Date", "Order Amount","Card Number", "Card Type","Location"];
export default (function() {
    
    // YOUR CODE GOES HERE
    // next line is for example only
    document.getElementById("app").innerHTML = 
    `<table class="table table-dark table-bordered table-hover">
        <thead>
            <tr>
                <th>Search:</th>
                <th colspan="2">
                    <input type="text" class="form-control" id="search">
                </th>
                <th>Convert Money: </th>
                <th>
                    <select>
                        <option></option>
                        <option>123</option>
                        <option>123</option>
                        <option>123</option>
                        <option>123</option>
                        <option>123</option>
                    </select>
                </th>
            </tr>
            <tr>
                ` + createHeaders(mas) +
                `
            </tr>
        </thead >
         <tbody>`+ table(orders) + statistics(orders) +
        `</tbody>
    </table >`;
    //<button>!!!!!!!</button>
    // document.getElementsByTagName("button")[0].addEventListener("click", () => {
    //     orders.push(orders[0]);
    //     console.log(1)
    // })
    
    
}());


//createHeaders(mas)
function createHeaders(props) {
    return props.map((item) => {
    //     if (sorted) {
    //         return (
    // `<th style="cursor:pointer">${item} <span>&#8595;</span></th>`
    //         )} 
       return ( 
        `<th style="cursor:pointer">${item}</th>`
       )}).join('');
}

function statistics(propsOrders) {
    return `<tr>
        <td colspan="3">Orders Count</td>
         <td colspan="4">`+ orderCount(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Orders Total</td>
        <td colspan="4">$`+ totalCheck(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Median Value</td>
        <td colspan="4">$` + mediana(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check</td>
        <td colspan="4">$` + average(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check (Female)</td>
        <td colspan="4">$` + femaleAvgCheck(propsOrders) + `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check (Male)</td>
        <td colspan="4">$`+ maleAvgCheck(propsOrders) + `</td>
    </tr>`
}

function table(props) {
    return props.map((item, i, props) => (
        `<tr id=order_${props[i].id}>
            <td>${props[i].transaction_id}</td>
            <td class=user_data>${userInfo(props[i].user_id)}</td>
            <td>${dateConvert(props[i])}</td>
            <td>$${props[i].total}</td>
            <td>${cardConvert(props[i].card_number)}</td>
            <td>${props[i].card_type}</td>
            <td>${props[i].order_country} (${props[i].order_ip})<td>
        </tr>`
    )).join('')
}

function hi() {
    console.log('hi');
}
//tableSortOrderAmount(orders);

// function tableSortOrderAmount(props) {
//     let arr = [];
//     props.forEach((item, i) => {
//         arr.push(+item.total)
//         //console.log(+props[i].total)
//     })
//     arr.sort((a,b) => {
//         return a -b;
//     })
//     props.map((item,i) => {
//         for (let i = 0; i< arr.length; i++) {
//             if (+item.total === arr[i]) {
//                 console.log(item.id)
//             //     return `<tr id=order_${item.id}>
//             //     <td>${props[i].transaction_id}</td>
//             //     <td class=user_data>${userInfo(props[i].user_id)}</td>
//             //     <td>${dateConvert(props[i])}</td>
//             //     <td>$${props[i].total}</td>
//             //     <td>${cardConvert(props[i].card_number)}</td>
//             //     <td>${props[i].card_type}</td>
//             //     <td>${props[i].order_country} (${props[i].order_ip})<td>
//             // </tr>`
//             }
//         }
//     })
//     //console.log(arr)
// }

// function spanArrow(propsEvent, propsTxt) {
//     if (propsEvent.target.innerText === propsTxt) {
//         //console.log(propsTxt)
//         return propsEvent.target.innerHTML += (` <span>&#8595;</span>`);
//     }
//     else {
        
//         return propsEvent.target.innerText = "Transaction ID"
//     }
//     //return (` <span>&#8595;</span>`);
// }
function spanArrow() {
    return (` <span>&#8595;</span>`);
}
document.getElementsByTagName("thead")[0].children[1].addEventListener("click", (ev) => {
    if (ev.target.cellIndex === 0) {
        if (ev.target.innerText === "Transaction ID") {
             ev.target.innerHTML += spanArrow();
             //console.log(ev.target.cellIndex);
             //console.log(ev)
            for (let i = 1; i < 7; i++) {
                if (ev.target.cellIndex === 1) {
                    ev.target.innerText = "User Info";
                }
                //if ()
                
            }
        }
        else {
            ev.target.innerText = "Transaction ID"
        }
    }
    if (ev.target.cellIndex === 1) {
        //console.log(ev.target.innerText)
        if (ev.target.innerText === "User Info") {
            ev.target.innerHTML += spanArrow();
        }
        else {
            ev.target.innerText = "User Info"
        }
    }
    if (ev.target.cellIndex === 2) {
        if (ev.target.innerText === "Order Date") {
            ev.target.innerHTML += spanArrow();
        }
        else {
            ev.target.innerText = "Order Date"
        }
    }
    if (ev.target.cellIndex === 3) {
        if (ev.target.innerText === "Order Amount") {
            ev.target.innerHTML += spanArrow();
        }
        else {
            ev.target.innerText = "Order Amount"
        }
    }
    if (ev.target.cellIndex === 5) {
        if (ev.target.innerText === "Card Type") {
            //console.log(ev.target.innerHTML)
            ev.target.innerHTML += spanArrow();
        }
        else {
            ev.target.innerText = "Card Type"
        }
    }
    if (ev.target.cellIndex === 6) {
        if (ev.target.innerText === "Location") {
            //console.log(ev.target.innerHTML)
            ev.target.innerHTML += spanArrow();
        }
        else {
            ev.target.innerText = "Location"
        }
    }
    
    









//-------------------------------------------------------------------------------------//
// const orderAmount = document.getElementById("orderAmount");
// console.log(orderAmount)
// console.log(document.getElementsByTagName("thead")[0].children[1].children[0]);
// //  orderAmount.state = false;
// orderAmount.addEventListener("click", () => {
//     if (orderAmount.state === true) {
//         orderAmount.innerText = "Order Amount";
//         orderAmount.state = false;
//         //table();
//     }
//     else {
//         orderAmount.state = true;
//         orderAmount.innerHTML += (` <span>&#8595;</span>`);
//         tableSortOrderAmount(orders);
//     }
    
 });






const userDetailInfo = [...document.getElementsByClassName("user-details")];
const userData = [...document.getElementsByClassName("user_data")];
userData.forEach((item, i, userData) => {
    userData[i].children[0].addEventListener("click", (event) => {
        event.preventDefault();
        isActive(userDetailInfo[i]);
    });
});









document.getElementById("search").addEventListener("keyup", () => {
    tableSearch()
})
    function tableSearch() {
        const txtPhrase = document.getElementById("search");
        let table = document.getElementsByTagName("table")[0];
        let regPhrase = new RegExp(txtPhrase.value, 'i');
        let flag = false;
        //console.log(table.rows[2].cells.length-1)
        //console.log(table.rows[table.rows.length-6])
        for (let i = 2; i < table.rows.length - 6; i++) {
            flag = false;
            flag = regPhrase.test(table.rows[i].cells[3].innerHTML);
            // if (flag) {
            //     break;
            // }
            if (flag) {
                table.rows[i].style.display = "";
            }
            else {
                table.rows[i].style.display = "none";
            }
        }

        //console.log(table.rows[2].cells[3].innerHTML)
        // for (let i = 2; i < table.rows.length-6; i++) {
        //     flag = false;
        //     for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
        //         flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
        //         if (flag) break;
        //     }
        //     if (flag) {
        //         table.rows[i].style.display = "";
        //     } else {
        //         table.rows[i].style.display = "none";
        //     }

         //}
    }