
export default function moneyConvert(props) {
    let xhr = new XMLHttpRequest();
    let url = `https://api.exchangeratesapi.io/latest`;
    xhr.open("GET", url,false);
    xhr.send();
    let value = JSON.parse(xhr.response)
    const USD_RATE = value.rates.USD;
    //console.log(USD_RATE);
    props.forEach((item, i) => {
        let euroValue = +item.total/USD_RATE;
       // console.log(euroValue)
        for (let key in value.rates) {
            //console.log(value.rates)
                if (key === "RUB") {
                    return euroValue * value.rates[key];
                }
                if (key === "USD") {
                    return euroValue * value.rates[key];
                }
                if (key === "NZD") {

                }
                if (key === "AUD") {
                    
                }
                if (key === "BGN") {
                    
                }
                if (key === "BRL") {
                    
                }
                if (key === "CAD") {
                    
                }
                if (key === "CHF") {
                    
                }
                if (key === "CNY") {
                    
                }
                if (key === "MXN") {
                    
                }
                if (key === "CZK") {
                    
                }
                if (key === "DKK") {
                    
                }
                if (key === "GBP") {
                    
                }
                if (key === "HKD") {
                    
                }
                if (key === "HRK") {
                    
                }
                if (key === "HUF") {
                    
                }
                if (key === "IDR") {
                    
                }
                if (key === "ILS") {
                    
                }
                if (key === "INR") {
                    
                }
                if (key === "ISK") {
                    
                }
                if (key === "JPY") {
                    
                }
                if (key === "KRW") {
                    
                }
                if (key === "MYR") {
                    
                }
                if (key === "NOK") {
                    
                }
                if (key === "PHP") {
                    
                }
                if (key === "PLN") {
                    
                }
                if (key === "RON") {
                    
                }
                if (key === "SEK") {
                    
                }
                if (key === "SGD") {
                    
                }
                if (key === "THB") {
                    
                }
                if (key === "TRY") {
                    
                }
                if (key === "ZAR") {
                    
                }

            }
        })
    
}
function usdToEuro(prop1,prop2) {
    return prop1 / prop2;
}