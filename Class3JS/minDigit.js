"use strict"

function minDigit(x){
    let xStr = String(x);
    let min = Number(xStr[0]);
    for(let i = 0; i < xStr.length; i++){
        if (min > Number(xStr[i])) min = Number(xStr[i]);
    }
    return min;
}

console.log(minDigit(312));