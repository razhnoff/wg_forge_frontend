import users from '../data/users';
import companies from '../data/companies';


export function average(props) {
    return totalCheck(props) / props.length;
}

export function totalCheck(props) {
    let result = props.reduce((sum, current) => {
        return sum + +current.total;
    }, 0);
    return result;
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
        return medianValue;
    }
    else {
        let medianValue = arr[(arr.length - 1) / 2];
        return medianValue;
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
    return totalMaleCheck / maleCounter;
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
    return totalFemaleCheck / femaleCounter;
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
        return `Nothing found`;
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
        return `Nothing found`;
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
        return `Nothing found`;
    }
}

function companyTitle(props) {
    if (props.company_id !== null) {
        for (let i = 0; i < companies.length; i++) {
            if (props.company_id === companies[i].id) {
                return companies[i].title;
            }
        }
    }
    else {
        return `Nothing found`;
    }
}

export function userDetails(props) {
    return `<div class="user-details" style="display: none">
        <p>Birthday: ` + dateConvert(props) + `</p>
        <p><img src="${props.avatar}" width="100px"></p>
        <p>Company: <a href=` + companyURL(props) + ` target="_blank">` + companyTitle(props) + `.</a></p>
        <p>Industry: ` + companyIndustry(props) + ` / ` + companySector(props) + `</p>
    </div>`;
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
        if ( props.birthday !== null) {
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
            return `Nothing found`;
        }
    }
    else {
        //console.log(props.created_at)
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
        if (i !== 0 && i !== 1 && i !== props.length - 1 && i !== props.length - 2 && i !== props.length - 3 && i !== props.length - 4) {
            str += "*";
        }
        else {
            str += props[i];
        }
    };
    return str;
}
