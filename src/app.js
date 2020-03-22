// this is an example of improting data from JSON
import orders from "../data/orders";
import companies from "../data/companies";
import users from "../data/users";
import {
  isActive,
  userInfo,
  dateConvert,
  cardConvert,
  orderCount,
  average,
  totalCheck,
  femaleAvgCheck,
  maleAvgCheck,
  mediana
} from "../components/helpers";
import {
  sortAmount,
  sortTransaction,
  sortDate,
  sortCardType,
  sortUser,
  sortLocation,
  sortDefault
} from "../components/sorters";
import {
  options,
  GET,
  EUR,
  USD,
  RUB,
  headers,
  financeList,
  URL,
  USD_VALUE,
  RUB_VALUE,
  EUR_VALUE
} from "./constants";

let rates = {};
let selectCurrency = USD;
let sortedBy = null;
let newListOrders = [...orders];
export const newListUsers = [...users];
export const newListCompanies = [...companies];

fetch(URL, {
  type: GET
})
  .then(response => {
    response.json(URL).then(data => {
      rates = data.rates;
    });
  })
  .catch(error => {
    console.log("Error on load rates: " + error);
  });
// This API will work after release of the project
// fetch('/api/orders', options)
//   .then(response => response.json())
//   .then((orders) => {
//     console.log(orders)
//   });
//
// fetch('/api/users', options)
//   .then(response => response.json())
//   .then((users) => {
//     console.log(users)
//   });
//
// fetch('/api/companies', options)
//   .then(response => response.json())
//   .then((companies) => {
//     console.log(companies)
//   });

export default (function() {
  createSelectTemplate(financeList);
  createHeadTemplate(headers);
  createTemplate(orders);
})();

function createSelectTemplate(finList) {
  document.getElementById("app").innerHTML =
    `<table class="table table-dark table-bordered table-hover">
    <thead>
        <tr>
            <th>Search:</th>
            <th colspan="4">
                <input type="text" class="form-control" id="search" placeholder="Enter user info, location, card type, order amount or transaction id" title="Enter user info, location, card type, order amount or transaction id">
            </th>
            <th>Convert Money: </th>
            <th>
                <select class="form-control form-control-sm" title="Convert money">
                    ` +
    converterList(finList) +
    `
                </select>
            </th>
        </tr>
    </thead>
    </table >`;
  [...document.getElementsByTagName("select")][0].removeEventListener(
    "change",
    handlerConvert
  );
}

function createHeadTemplate(tableHeaders, index) {
  const theadRow = document.getElementsByTagName("thead")[0];
  if (theadRow.children[1]) {
    theadRow.children[1].remove();
  }
  let newTableRow = document.createElement("tr");
  newTableRow.innerHTML = createHeaders(tableHeaders, index);
  theadRow.appendChild(newTableRow);
  for (let i = 0; i < headers.length; i++) {
    document
      .getElementsByTagName("thead")[0]
      .children[1].children[i].removeEventListener("click", handlerSort);
  }
  listeners();
}

function createHeaders(props, cellIndex) {
  if (cellIndex !== undefined) {
    if (cellIndex !== 4) {
      return props
        .map((item, i) => {
          if (item !== props[4] && i === cellIndex) {
            return `<th style="cursor:pointer" id="header_${i}">${item} <span>&#8595;</span></th>`;
          } else {
            if (item !== props[4]) {
              return `<th style="cursor:pointer" id="header_${i}">${item}</th>`;
            } else {
              return `<th id="header_${i}">${item}</th>`;
            }
          }
        })
        .join("");
    }
  }
  return props
    .map((item, i) => {
      if (item !== props[4]) {
        return `<th style="cursor:pointer" id="header_${i}">${item}</th>`;
      } else {
        return `<th id="header_${i}">${item}</th>`;
      }
    })
    .join("");
}

function createTemplate(propsOrders) {
  [...document.getElementsByClassName("user_data")].forEach(item => {
    item.children[0].addEventListener("click", handlerUserDetails);
  });
  const tbody = document.getElementsByTagName("tbody")[0];
  if (tbody) {
    tbody.remove();
  }
  let newTbody = document.createElement("tbody");
  newTbody.innerHTML = table(propsOrders) + statistics(propsOrders);
  document.getElementsByTagName("table")[0].appendChild(newTbody);
  listenerUserInfo();
}

function table(props) {
  if (props.length > 0) {
    return props
      .map(
        item =>
          `<tr id=order_${item.id}>
            <td>${item.transaction_id}</td>
            <td class=user_data>${userInfo(item.user_id)}</td>
            <td>${dateConvert(item)}</td> 
            <td>${moneyConvert(item)}</td>
            <td>${cardConvert(item.card_number)}</td>
            <td>${item.card_type}</td>
            <td>${item.order_country} (${item.order_ip})<td>
        </tr>`
      )
      .join("");
  } else {
    return `<tr>
            <td colspan="7" class="text-center">Nothing found</td>
        </tr>`;
  }
}

function listeners() {
  for (let i = 0; i < headers.length; i++) {
    if (i !== 4) {
      document
        .getElementsByTagName("thead")[0]
        .children[1].children[i].addEventListener("click", handlerSort);
    }
  }
}

function sortAction(func) {
  switch (func) {
    case "header_0":
      return sortTransaction;
    case "header_2":
      return sortDate;
    case "header_3":
      return sortAmount;
    case "header_5":
      return sortCardType;
    case "header_6":
      return sortLocation;
  }
}

function handlerSort(event) {
  const name = typeof event === "object" ? event.currentTarget.id : event;
  let index = typeof event === "object" ? event.target.cellIndex : event;
  if (name !== "header_1") {
    if (sortedBy != name) {
      sortedBy = name;
      typeof index === "number" ? 1 : (index = +index.charAt(index.length - 1));
      createHeadTemplate(headers, index);
      createTemplate(newListOrders.sort(sortAction(sortedBy)));
    } else {
      typeof index === "number" ? 1 : (index = +index.charAt(index.length - 1));
      index = undefined;
      createHeadTemplate(headers, index);
      createTemplate(newListOrders.sort(sortDefault));
      sortedBy = null;
    }
  } else {
    if (sortedBy != name) {
      sortedBy = name;
      typeof index === "number" ? 1 : (index = +index.charAt(index.length - 1));
      createHeadTemplate(headers, index);
      createTemplate(sortUser(newListOrders, newListUsers), index);
    } else {
      typeof index === "number" ? 1 : (index = +index.charAt(index.length - 1));
      index = undefined;
      createHeadTemplate(headers, index);
      createTemplate(newListOrders.sort(sortDefault));
      sortedBy = null;
    }
  }
}

[...document.getElementsByTagName("select")][0].addEventListener(
  "change",
  handlerConvert
);
[...document.getElementsByTagName("select")][0].value = selectCurrency;

function handlerConvert(event) {
  if (sortedBy == null) {
    newListOrders = newListOrders;
    convert(newListOrders, event);
    createTemplate(newListOrders);
  } else {
    convert(newListOrders, event);
    createTemplate(newListOrders);
  }
}

const txtPhrase = document.getElementById("search");
txtPhrase.addEventListener("keyup", handlerSearch);

function handlerSearch() {
  let regPhrase = new RegExp(txtPhrase.value, "i");
  newListOrders = [...orders].filter(order => {
    const users = newListUsers.filter(user => user.id === order.user_id);
    if (
      users &&
      users.length > 0 &&
      (regPhrase.test(users[0].first_name) ||
        regPhrase.test(users[0].last_name))
    ) {
      return order;
    }
    return regPhrase.test(order.total) ||
      regPhrase.test(order.card_type) ||
      regPhrase.test(order.transaction_id) ||
      regPhrase.test(order.order_country) ||
      regPhrase.test(order.order_ip)
      ? order
      : null;
  });
  createTemplate(newListOrders);
  if (sortedBy) {
    const sort = sortedBy;
    sortedBy = null;
    handlerSort(sort);
  }
}

function listenerUserInfo() {
  [...document.getElementsByClassName("user_data")].forEach(item => {
    item.children[0].addEventListener("click", handlerUserDetails);
  });
}

function handlerUserDetails(event) {
  event.preventDefault();
  isActive(event.currentTarget.nextElementSibling);
}

function moneySymbol() {
  if (selectCurrency === USD) {
    return `${USD_VALUE} `;
  }
  if (selectCurrency === EUR) {
    return `${EUR_VALUE} `;
  }
  if (selectCurrency === RUB) {
    return `${RUB_VALUE} `;
  } else {
    return `${selectCurrency} `;
  }
}

function moneyConvert(props) {
  return `${moneySymbol()} ${props.total}`;
}

function convert(props, event) {
  if (selectCurrency !== EUR) {
    props.map(order => {
      order.total = (order.total / rates[selectCurrency]).toFixed(2);
    });
  }
  selectCurrency = event.currentTarget.value;
  if (selectCurrency !== EUR) {
    props.map(order => {
      order.total = (order.total * rates[selectCurrency]).toFixed(2);
    });
    return props;
  } else {
    return props;
  }
}

function converterList(financeList) {
  return financeList.map(item => {
    if (item === USD || item === EUR || item === RUB) {
      return `<option style="font-weight: bold" value="${item}">${item}</option>`;
    } else {
      return `<option value="${item}">${item}</option>`;
    }
  });
}

function statistics(propsOrders) {
  if (propsOrders.length > 0) {
    return (
      `<tr>
        <td colspan="3">Orders Count</td>
         <td colspan="4">` +
      orderCount(propsOrders) +
      `</td>
    </tr>
    <tr>
        <td colspan="3">Orders Total</td>
        <td colspan="4">` +
      moneySymbol() +
      totalCheck(propsOrders) +
      `</td>
    </tr>
    <tr>
        <td colspan="3">Median Value</td>
        <td colspan="4">` +
      moneySymbol() +
      mediana(propsOrders) +
      `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check</td>
        <td colspan="4">` +
      moneySymbol() +
      average(propsOrders) +
      `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check (Female)</td>
        <td colspan="4">` +
      moneySymbol() +
      femaleAvgCheck(propsOrders) +
      `</td>
    </tr>
    <tr>
        <td colspan="3">Average Check (Male)</td>
        <td colspan="4">` +
      moneySymbol() +
      maleAvgCheck(propsOrders) +
      `</td>
    </tr>`
    );
  } else {
    return `<tr>
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
    </tr>`;
  }
}
