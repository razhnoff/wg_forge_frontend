// this is an example of improting data from JSON
import orders from '../data/orders.json';
import { isActive, userInfo, dateConvert, cardConvert, average, totalCheck, orderCount, femaleAvgCheck, maleAvgCheck, mediana } from '../components/helpers.js';
//import moneyConvert from '../components/converter/converter';
import users from '../data/users.json';




const headers = ["Transaction ID", "User Info", "Order Date", "Order Amount", "Card Number", "Card Type", "Location"];
export default (function () {
    createTemplate(orders);
    // YOUR CODE GOES HERE
    // next line is for example only
    function createTemplate(propsOrders,event) {
      
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
                    <select class="form-control form-control-sm">
                        <option value="0">USD</option>
                        <option>RUB</option>
                        <option>NZD</option>
                        <option>123</option>
                        <option>123</option>
                        <option>123</option>
                    </select>
                </th>
            </tr>
            <tr>
                ` + createHeaders(headers,event) +
            `
            </tr>
        </thead >
         <tbody>`+ table(propsOrders) + statistics(propsOrders) +
            `</tbody>
    </table >`;
        listeners();
    }

    //createTemplate(sortAmount(orders));

    // const orderAmount = document.getElementsByTagName("thead")[0].children[1].children[3];
    // orderAmount.addEventListener("click", (ev) => {
    //         sortAmount.state = true;
    //         //console.log(ev.target.cellIndex)
    //         createTemplate(orders.sort(sortAmount));

    //     })

    //console.log(document.getElementsByTagName("thead")[0].children[1].children)




    function listeners() {
        for (let i = 0; i < headers.length; i++) {
            if (i !== 4) {
                document.getElementsByTagName("thead")[0].children[1].children[i].addEventListener("click", (event) => {
                    const newListOrders = [...orders];
                    const newListUsers = [...users];
                    if (event.currentTarget.id === "header_0") {

                        createTemplate(newListOrders.sort(sortTransaction), event);
                    }
                    if (event.currentTarget.id === "header_1") {
                        createTemplate(sortUser(newListOrders,newListUsers), event);
                    }
                    if (event.currentTarget.id === "header_2") {
                        createTemplate(newListOrders.sort(sortDate), event);
                    }
                    if (event.currentTarget.id === "header_3") {
                        createTemplate(newListOrders.sort(sortAmount), event);
                    }
                    if (event.currentTarget.id === "header_5") {
                        createTemplate(newListOrders.sort(sortCardType), event);
                    }
                    if (event.currentTarget.id === "header_6") {
                        createTemplate(newListOrders.sort(sortLocation), event);
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
    }


    function createHeaders(props, event) {
        if (event !== undefined) {
            if (event.target.cellIndex === 0) {
                return props.map((item, i) => {
                    if (item !== props[4] && i === 0) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                    }
                    else {
                        return (
                            `<th id="header_${i}">${item}</th>`
                        )
                    }
                }).join('');
            }
            if (event.target.cellIndex === 1) {
                return props.map((item, i) => {
                    if (item !== props[4] && i === 1) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                    }
                    else {
                        return (
                            `<th id="header_${i}">${item}</th>`
                        )
                    }
                }).join('');
            }
            if (event.target.cellIndex === 2) {
                return props.map((item, i) => {
                    if (item !== props[4] && i === 2) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                    }
                    else {
                        return (
                            `<th id="header_${i}">${item}</th>`
                        )
                    }
                }).join('');
            }
            if (event.target.cellIndex === 3) {
                return props.map((item, i) => {
                    if (item !== props[4] && i === 3) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                    }
                    else {
                        return (
                            `<th id="header_${i}">${item}</th>`
                        )
                    }
                }).join('');
            }
            if (event.target.cellIndex === 5) {
                return props.map((item, i) => {
                    if (item !== props[4] && i === 5) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                    }
                    else {
                        return (
                            `<th id="header_${i}">${item}</th>`
                        )
                    }
                }).join('');
            }
            if (event.target.cellIndex === 6) {
                return props.map((item, i) => {
                    if (item !== props[4] && i === 6) {
                        return (`<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`);
                    }
                    else {
                        return (
                            `<th id="header_${i}">${item}</th>`
                        )
                    }
                }).join('');
            }
        }
        return props.map((item, i) => {
            if (item !== props[4] ) {
               return (`<th style="cursor:pointer" id="header_${i}">${item}</th>`);
            }
            else {
            return (
                `<th id="header_${i}">${item}</th>`
            );
             }
        }).join('');
    }
}());


function sortAmount(a, b) {
    if (+a.total > +b.total)
        return 1;
    if (+a.total === +b.total)
        return 0;
    if (+a.total < +b.total)
        return -1;
}

//-------TRANSACTION SORT------//

function sortTransaction(a, b) {
    if (a.transaction_id > b.transaction_id)
        return 1;
    if (a.transaction_id === b.transaction_id)
        return 0;
    if (a.transaction_id < b.transaction_id)
        return -1;
}


//DATE SORT//////////
function sortDate(a, b) {
    if (a.created_at > b.created_at)
        return 1;
    if (a.created_at === b.created_at)
        return 0;
    if (a.created_at < b.created_at)
        return -1;
}

function sortCardType(a, b) {
    if (a.card_type > b.card_type)
        return 1;
    if (a.card_type < b.card_type)
        return -1;
    if (a.card_type === b.card_type)
        return 0;
}
function sortUser(listOrders,listUsers) {
    listUsers.sort((a, b) => {
        return (b.first_name < a.first_name) - (a.first_name < b.first_name) || (b.last_name < a.last_name) - (a.last_name < b.last_name);
    })
    let newOrders = [];
    listUsers.forEach((user) => {
        listOrders.forEach((order) => {
            if (order.user_id === user.id) {
                newOrders.push(order);
            }
        })
    })
    // for (let i =0; i < users.length; i++) {
    //     newOrders = [
    //         ...newOrders,
    //         ...list.filter((order) => {
    //             return order.user_id === users[i].id;
    //         })
    //     ];
    // }
    //console.log(list);
    return newOrders;
}
//orders.sort(sortLocation);
function sortLocation(a, b) {
    return (b.order_country<a.order_country) - (a.order_country<b.order_country) || (b.order_ip<a.order_ip) - (a.order_ip<b.order_ip);
    // if (a.order_country > b.order_country) {
    //     return 1;
    // }
    // if (a.order_country < b.order_country) {


    //     return -1;
    // }
    // if (a.order_country === b.order_country) {
    //     if (a.order_ip > b.order_ip) {
    //         return 1;
    //     }
    //     if (a.order_ip < b.order_ip) {
    //         return -1;
    //     }
    //     if (a.order_ip === b.order_ip) {
    //         return 0;
    //     }
    // }
}



//     // if (a.order_country > b.order_country && a.order_ip > b.order_ip)
//     //     return 1;
//     // if (a.order_country < b.order_country && a.order_ip < b.order_ip) {
//     //     return -1;
//     // }
//     // if (a.order_country === b.order_country && a.order_ip === b.order_ip) {
//     // return 0;
//     // }



class User {
    say() {
        console.log('say');
    }
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