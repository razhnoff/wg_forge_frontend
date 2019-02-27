import users from '../data/users';
import companies from '../data/companies';


export function average(props) {
    return (totalCheck(props) / props.length).toFixed(2);
}

export function totalCheck(props) {
    let result = props.reduce((sum, current) => {
        return sum + +current.total;
    }, 0);
    return result.toFixed(2);
}

export function orderCount(props) {
    let result = props.reduce((sum, current, index) => {
        return index + 1;
    }, 0);
    return result;
}

export function mediana(props) {
    let arr = [];
    props.forEach((item, i) => {
        arr.push(+item.total);
    })
    arr.sort((a, b) => {
        return a - b;
    });
    if (arr.length % 2 == 0) {
        let medianValue = (arr[(arr.length) / 2 - 1] + arr[(arr.length) / 2]) / 2;
        return medianValue.toFixed(2);
    }
    else {
        let medianValue = arr[(arr.length - 1) / 2];
        return medianValue.toFixed(2);
    }
}

export function isActive(props) {
    // if (props.classList.contains('hidden')) {
    //     props.classList.remove('hidden');
    // }
    // else {
    //     props.classList.add('hidden');
    // }
    if (props.style.display === 'none') {
        props.style.display = 'block';
    }
    else {
        props.style.display = 'none';
    }
}

export function maleAvgCheck(props) {
    let totalMaleCheck = 0,
        maleCounter = 0;
    users.forEach((user) => {
        if (user.gender === "Male") {
            props.forEach((item) => {
                if (item.user_id === user.id) {
                    maleCounter++;
                    totalMaleCheck += +item.total;
                }
            });
        }
    });
    return (totalMaleCheck / maleCounter).toFixed(2);
}

export function femaleAvgCheck(props) {
    let totalFemaleCheck = 0,
        femaleCounter = 0;
    users.forEach((user) => {
        if (user.gender === "Female") {
            props.forEach((item) => {
                if (item.user_id === user.id) {
                    femaleCounter++;
                    totalFemaleCheck += +item.total;
                }
            });
        }
    });
    return (totalFemaleCheck / femaleCounter).toFixed(2);
}

export function userInfo(props) {
    let gender = "";
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === props) {
            if (users[i].gender === "Male") {
                gender = "Mr";
            }
            else {
                gender = "Ms";
            }
            return `<a href="#">${gender}. ${users[i].first_name} ${users[i].last_name}</a>${userDetails(users[i])}`;
        }
    }
}

function companyIndustry(props) {
    if (props.company_id !== null) {
        for (let i = 0; i < companies.length; i++) {
            if (props.company_id === companies[i].id) {
                return companies[i].industry;
            }
        }
    }
    else {
        return `n/a`;
    }
}

function companySector(props) {
    if (props.company_id !== null) {
        for (let i = 0; i < companies.length; i++) {
            if (props.company_id === companies[i].id) {
                return companies[i].sector;
            }
        }
    }
    else {
        return `n/a`;
    }
}
function companyURL(props) {
    if (props.company_id !== null) {
        for (let i = 0; i < companies.length; i++) {
            if (props.company_id === companies[i].id) {
                return companies[i].url;
            }
        }
    }
    else {
        return `n/a`;
    }
}
// linkBlock();
// function linkBlock() {
//     //document.getElementsByTagName("a")[1].innerText = "1";
//     let a = document.getElementsByTagName("a")[1];
//     console.log(a);
//         // for (let i = 0; i < document.getElementsByTagName("a").length; i++) {
//         //     if (document.getElementsByTagName("a")[i].innerText === "Nothing found") {
//         //         console.log(4)
//         //     }
//         // }
// }
function companyTitle(props) {
    if (props.company_id !== null) {
        for (let i = 0; i < companies.length; i++) {
            if (props.company_id === companies[i].id) {
                return companies[i].title;
            }
        }
    }
    else {
        return ``;
    }
}

export function userDetails(props) {
    return `<div class="user-details" style="display: none">
        <p>Birthday: ` + dateConvert(props) + `</p>
        <p><img src="${props.avatar}" width="100px"></p>
        <p>Company: ` + linkGen(props) + `</p>
        <p>Industry: ` + companyIndustry(props) + ` / ` + companySector(props) + `</p>
    </div>`;
}

function linkGen(props) {
    const comp = companyTitle(props);
    if (comp) {
        return `<a href=` + companyURL(props) + ` target="_blank">` + companyTitle(props) + `.</a>`
    }
    else {
        return `n/a`;
    }
}
// function dateBirthday(props) {
//     //for (let i = 0; i < users.length; i++) {
//         //console.log(props)
//         if (props.birthday === users[1].birthday) {

//         }
//     //}
//     if ( props.birthday !== null) {
//         let date = new Date(+props.birthday);
//         let month = `0`;
//         if (date.getMonth() < 9) {
//             month += date.getMonth() + 1;
//         }
//         else {
//             month = date.getMonth() + 1;
//         }
//         return `${date.getDate()} / ${month} / ${date.getFullYear()}`
//     }
//     else {
//         return `Nothing found`;
//     }

// }

export function dateConvert(props) {
    if (props.created_at === undefined) {
        if (props.birthday !== null) {
            let date = new Date(+props.birthday);
            let month = `0`;
            if (date.getMonth() < 9) {
                month += date.getMonth() + 1;
            }
            else {
                month = date.getMonth() + 1;
            }
            return `${date.getDate()} / ${month} / ${date.getFullYear()}`
        }
        else {
            return `n/a`;
        }
    }
    else {
        let date = new Date(+props.created_at);
        let month = `0`;
        if (date.getMonth() < 9) {
            month += date.getMonth() + 1;
        }
        else {
            month = date.getMonth() + 1;
        }
        return `${date.getDate()}/${month}/${date.getFullYear()}, ${timeConvert(date)}`;
    }
}


function timeConvert(props) {
    let arr = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    let sec = `0`,
        min = `0`,
        hour,
        AMPM;
    if (props.getSeconds() < 10) {
        sec += props.getSeconds();
    }
    else {
        sec = props.getSeconds();
    }
    if (props.getMinutes() < 10) {
        min += props.getMinutes();
    }
    else {
        min = props.getMinutes();
    }
    if (props.getHours() <= 12) {
        hour = props.getHours();
        AMPM = `AM`;
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            if (props.getHours() === arr[i]) {
                hour = i + 1;
                AMPM = `PM`;
            }
        }
    }
    return `${hour}:${min}:${sec} ${AMPM}`;
}


export function cardConvert(props) {
    let str = "";
    for (let i = 0; i < props.length; i++) {
        if (i > 1 && i < props.length-4) {
            str += "*";
        }
        else {
            str += props[i];
        }
    };
    return str;
}
