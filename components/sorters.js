export function sortAmount(a, b) {
    if (+a.total > +b.total)
        return 1;
    if (+a.total === +b.total)
        return 0;
    if (+a.total < +b.total)
        return -1;
}

//-------TRANSACTION SORT------//

export function sortTransaction(a, b) {
    if (a.transaction_id > b.transaction_id)
        return 1;
    if (a.transaction_id === b.transaction_id)
        return 0;
    if (a.transaction_id < b.transaction_id)
        return -1;
}


//DATE SORT//////////
export function sortDate(a, b) {
    if (a.created_at > b.created_at)
        return 1;
    if (a.created_at === b.created_at)
        return 0;
    if (a.created_at < b.created_at)
        return -1;
}

export function sortCardType(a, b) {
    if (a.card_type > b.card_type)
        return 1;
    if (a.card_type < b.card_type)
        return -1;
    if (a.card_type === b.card_type)
        return 0;
}
export function sortUser(listOrders, listUsers) {
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
    listOrders.splice(0, listOrders.length);
    for (let i =0; i < newOrders.length; i++) {
        listOrders.push(newOrders[i]);
    }
    return listOrders;
}
//orders.sort(sortLocation);
export function sortLocation(a, b) {
    return (b.order_country < a.order_country) - (a.order_country < b.order_country) || (b.order_ip < a.order_ip) - (a.order_ip < b.order_ip);
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